import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { UserService } from '../service/user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any, @Res() res) {
    try {
      const userID = req.user.userID
      const result = await this.userService.findOne({
        where: { userID: userID.partyID }
      })
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('orderHistory')
  async getOrderHistory(@Req() req: any, @Res() res) {
    try {
      const userID = req.user.userID
      const response = await this.userService.getOrderHistory(userID);
      return res.status(HttpStatus.OK).json(response)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }
}