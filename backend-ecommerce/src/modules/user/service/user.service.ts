import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private user: Repository<User>,
  ) { }

  async create(data: User): Promise<User> {
    return this.user.save(data);
  }

  async findOne(options = {}): Promise<User> {
    return this.user.findOne(options);
  }


  async getOrderHistory(userID: number) {
    return this.user.findOne({ where: { userID: userID }, relations: ['orders', 'orders.orderMappings', 'orders.orderMappings.product'], })
  }
}