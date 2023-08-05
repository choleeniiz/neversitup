import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs'
import { v4 } from 'uuid';
import { env } from '../../../constants/environment';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) { }

  async register(userData: any) {
    // Implement register logic here
    // Create new user, store in database, etc.
  }

  async login(user): Promise<any>  {
    try{
      this.logger.log('signin log => genarate JWT');

      const authorization = {
        token: v4(),
        created: dayjs(),
        userID: user.userID,
      };
  
      const accessToken = this.jwtService.sign(authorization, {
        expiresIn: env.JWT.expiration || '30d',
      });
  
      const response = {
        user: {
          ...user,
          password: undefined,
          deletedAt: undefined,
        },
        accessToken: authorization.token,
      };
  
      response.accessToken = accessToken;
      console.log('response',response)
      return response;
    } catch (err) {
      return err
    }
  }
}