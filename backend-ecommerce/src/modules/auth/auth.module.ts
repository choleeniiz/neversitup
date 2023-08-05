import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { CryptoService } from 'src/utils/crypto.service';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.SECRET_TOKEN,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION,
            },
        }),
    ],
    providers: [AuthService, JwtStrategy, CryptoService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
