import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { ProductProvider } from './product.provider';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [...ProductProvider, ProductService],
    controllers: [ProductController],
    exports: [ProductService],
})
export class ProductModule {}
