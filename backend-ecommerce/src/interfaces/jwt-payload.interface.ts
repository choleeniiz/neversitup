import { Dayjs } from "dayjs";

export interface JwtPayload {
  token?: string
  created?: Dayjs
  uuid?: string
  userID?: number
}
