import { Controller, Post, Body, Logger, BadRequestException, Res, HttpStatus, UnauthorizedException, Param, Req } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO, RegisterResponseDTO } from '../dto/auth.dto';
import { UserService } from '../../user/service/user.service';
import { ILike } from 'typeorm';
import { CryptoService } from 'src/utils/crypto.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService
    ) {}

    @Post('/register')
    @ApiBody({ type: RegisterDTO })
    @ApiResponse({ type: RegisterResponseDTO, status: HttpStatus.OK })
    async register(@Body() body: RegisterDTO, @Res() res) {
      try {  
        const user = await this.userService.findOne({
          attributes: {
            exclude: ['password']
          },
          where: {
            username: ILike(body?.username)
          }
        })
  
        if (user) {
          this.logger.error('register failure => email duplicate')
          throw new BadRequestException({
            message: 'username ของท่านซ้ำในระบบ'
          })
        }
  
        const data: RegisterDTO = {
          username: body.username,
          password: await this.cryptoService.hash(body.password),
        }

        await this.userService.create(data)
        return res.status(HttpStatus.OK).json({ message: 'สมัครสำเร็จ' })
  
      } catch (error) {
        console.log('error', error)
        return res.status(HttpStatus.BAD_REQUEST).json(error)
      }
    }

  @Post('login')
  @ApiBody({ type: LoginDTO })
  async login(@Body() body: LoginDTO, @Res() res) {
    try {
      if (!body?.username || !body?.password) {
        this.logger.error('login failure => username or password is required')
        throw new BadRequestException({
          message: 'กรุณากรอกข้อมูล'
        })
      }

      const user = await this.userService.findOne({
        where: {
          username: ILike(body?.username)
        },
        select: ["userID","username","password"]
      })

      if (!user) {
        this.logger.error('login failure => user not found')
        throw new UnauthorizedException({
          message: 'username ของท่านไม่มีในระบบ'
        })
      }

      if (
        user &&
        user?.username &&
        user?.password &&
        body?.username &&
        body?.password
      ) {
        const isMatch = await this.cryptoService.compare(
          body.password,
          user.password,
        )

        if (!isMatch) {
          this.logger.error('login failure => password not match')
          throw new UnauthorizedException({
            message: 'username หรือรหัสผ่านไม่ถูกต้อง'
          })
        }
        this.logger.log('login success')

        const response = await this.authService.login(user)
        console.log('response controller',response)
        return res.status(HttpStatus.OK).json(response)
      } else {
        this.logger.error('login failure => invalid user data')
        throw new UnauthorizedException({
          message: 'username ของท่านไม่มีในระบบ'
        })
      }

    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).json(error)
    }
  }
}