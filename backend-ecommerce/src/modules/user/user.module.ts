import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserProvider } from './user.provider';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [...UserProvider, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }

