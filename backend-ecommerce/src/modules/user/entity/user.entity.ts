import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm'
import { Order } from '../../order/entity/order.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userID?: number

    @Column()
    username: string

    @Column({ select: false })
    password: string

    @OneToMany(() => Order, (order) => order.user, { onDelete: 'CASCADE' })
    orders?: Order[];
}
