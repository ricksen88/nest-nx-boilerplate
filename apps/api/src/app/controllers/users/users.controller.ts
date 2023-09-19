import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { User } from '../../guards/user.decorator';
import { IUser } from '@webal-nest/interfaces';
import { UserGuard } from '../../guards/user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('me')
  @UseGuards(UserGuard)
  async createMainAdmin(@User() user: IUser) {
    try {
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
