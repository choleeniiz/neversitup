import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderProvider } from './order.provider';
import { UserProvider } from '../user/user.provider';

@Module({
    imports: [
        DatabaseModule, AuthModule, UserModule, ProductModule,
    ],
    providers: [...OrderProvider, OrderService, ...UserProvider],
    controllers: [OrderController],
    exports: [OrderService],
})
export class OrderModule { }
