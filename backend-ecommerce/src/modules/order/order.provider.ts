import { DataSource } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderMapping } from './entity/order-mapping.entity';

export const OrderProvider = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDERMAPPING_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderMapping),
    inject: ['DATA_SOURCE'],
  }
];
