import { Controller, Post, Delete, Get, Param, Body, Req, Res, HttpStatus, UseGuards, Patch } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { OrderDTO } from '../dto/order.dto';
import { EORDERSTATUS } from 'src/constants/enum';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('createOrder')
  async createOrder(@Body() orderData: OrderDTO[], @Req() req, @Res() res) {
    try {
      const user = req.user.userID
      const order = this.orderService.create(orderData, user)
      const newOrder = await this.orderService.findOne({ where: { orderID: (await order).orderID } })
      return res.status(HttpStatus.OK).json({ message: newOrder.status })
    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).json(error)
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async cancelOrder(@Param('id') id: number, @Req() req, @Res() res) {
    try {
      // const user = req.user.userID
      const order = await this.orderService.findOne({ where: { orderID: id } })
      // if (order?.user?.userID + '' !== user) {
        if (order) {
          const result = await this.orderService.updateOrder(id, { status: EORDERSTATUS.CANCEL });
          return res.status(HttpStatus.OK).json({ message: 'ยกเลิกคำสั่งซื้อสำเร็จ' })
        } else {
          return res.status(HttpStatus.OK).json({ message: 'ไม่มีคำสั่งซื้อนี้' })
        }
        // return res.status(HttpStatus.BAD_GATEWAY).json({ message: 'ยกเลิกคำสั่งซื้อไม่สำเร็จ' })
      // }

    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).json(error)
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: string, @Res() res) {
    try{
      const response = await this.orderService.findOne({ 
        where: { orderID: id + '' }, 
        relations: ['user','orderMappings.product'],
      })
      return res.status(HttpStatus.OK).json(response)
    } catch(error) {
      return res.status(HttpStatus.BAD_GATEWAY).json(error)
    }
    
  }
}