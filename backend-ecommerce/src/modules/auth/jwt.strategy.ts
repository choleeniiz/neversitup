import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { env } from '../../constants/environment'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from 'src/interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name)

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT.secret,
      passReqToCallback: true,
    })
  }

  async validate(request: any, payload: JwtPayload) {
    const user = payload
    if (!user) {
      this.logger.error(`user not found`)
      throw new UnauthorizedException()
    }

    return user
  }
}
