import * as dotenv from 'dotenv'
dotenv.config()

export const env = {
  port: process.env.APP_PORT,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dbname: process.env.DB_NAME,
    port: +process.env.DB_PORT,
  },
  JWT: {
    secret: process.env.SECRET_TOKEN,
    expiration: process.env.JWT_EXPIRATION
  },
}
