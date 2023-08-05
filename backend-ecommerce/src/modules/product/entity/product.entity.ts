import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import { OrderMapping } from '../../order/entity/order-mapping.entity'
import { Order } from '../../order/entity/order.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productID?: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    quantity: number

    @Column()
    price: number

    @OneToMany(() => OrderMapping, (orderMapping) => orderMapping.product, { onDelete: 'CASCADE' })
    orders: OrderMapping[];

}
