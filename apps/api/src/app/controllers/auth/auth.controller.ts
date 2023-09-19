import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { MainAdminCreateDto } from './dtos/main-admin.create.dto';
import { AuthCreateMainAdmin, AuthSignIn } from '@webal-nest/contracts';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('main-admin')
  async createMainAdmin(@Body() dto: MainAdminCreateDto) {
    try {
      return await this.rmqService.send<
        AuthCreateMainAdmin.Request,
        AuthCreateMainAdmin.Response
      >(AuthCreateMainAdmin.topic, dto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    try {
      return this.rmqService.send<AuthSignIn.Request, AuthSignIn.Response>(
        AuthSignIn.topic,
        dto
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
