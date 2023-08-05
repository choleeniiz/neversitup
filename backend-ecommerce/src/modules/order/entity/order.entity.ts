import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { User } from '../../user/entity/user.entity';
import { Product } from '../../product/entity/product.entity';
import { OrderMapping } from './order-mapping.entity';
import { EORDERSTATUS } from 'src/constants/enum';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderID: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userID' })
    user: User;

    @OneToMany(() => OrderMapping, (orderMapping) => orderMapping.order, { onDelete: 'CASCADE' })
    orderMappings: OrderMapping[]; 

    @Column({
        default: EORDERSTATUS.SUCCESS,
    })
    status?: string

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt?: string;

    @DeleteDateColumn()
    deletedAt?: string;

}
