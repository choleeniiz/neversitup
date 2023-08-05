import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private user: Repository<Product>,
  ) {}

  async findAll(options): Promise<Product[]> {
    return this.user.find(options)
  }

  async findOne(options = {}): Promise<Product> {
    return this.user.findOne(options)
  }
}