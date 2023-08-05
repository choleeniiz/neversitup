import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptoService {
  constructor() {}

  async hash(password) {
    return bcrypt.hash(password, 10)
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash)
  }

}
