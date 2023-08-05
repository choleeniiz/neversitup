import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entity/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderMapping {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Order, { eager: true})
  @ManyToOne(() => Order)
  // @JoinColumn({ name: 'orderID' })
  order: Order;

  // @ManyToOne(() => Product, { eager: true })
  @ManyToOne(() => Product)
  // @JoinColumn({ name: 'productID' })
  product: Product;

  @Column()
  quantity: number;

}