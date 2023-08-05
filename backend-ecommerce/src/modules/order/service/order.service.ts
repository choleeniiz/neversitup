import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { ProductService } from '../../product/service/product.service';
import { User } from '../../user/entity/user.entity';
import { OrderMapping } from '../entity/order-mapping.entity';
import { EORDERSTATUS } from 'src/constants/enum';

@Injectable()
export class OrderService {
  constructor(

    @Inject('ORDER_REPOSITORY')
    private order: Repository<Order>,
    @Inject('ORDERMAPPING_REPOSITORY')
    private orderMapping: Repository<OrderMapping>,
    @Inject('USER_REPOSITORY')
    private user: Repository<User>,
    private readonly productService: ProductService
  ) { }

  async findOne(options = {}): Promise<Order> {
    return this.order.findOne(options)
  }

  async create(data: any, userID: number): Promise<Order> {
    try {
      const newUser = new User()
      newUser.userID = userID
      const order = await this.order.save({ user: newUser })
      if (order) {
        const result = await data.map((item) => {
          this.productService.findOne({ where: { productID: item.orderID } }).then((value) => {
            if (value.quantity >= item.quantity) {
              const orderData = new Order()
              orderData.orderID = order.orderID
              this.orderMapping.save({
                order: orderData,
                product: item.productID,
                quantity: item.quantity
              })
            } else {
              this.order.update(order.orderID, { status: EORDERSTATUS.FAIL })
            }
          })
        })
      }
      return order
    } catch (error) {
      throw new BadRequestException({
        message: 'คำสั่งซื้อผิดพลาด'
      })
    }
  }

  async updateOrder(orderID: number, options = {}) {
    const response = this.order.update(orderID, { status: EORDERSTATUS.FAIL })
    return response
  }

  async delete(orderId: string) {
    return this.order.softDelete(orderId)
  }
}