import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { MainAdminCreateDto } from './dtos/main-admin.create.dto';
import {
  AuthCreateMainAdmin,
  AuthSignIn,
  AuthSignup,
  AuthSignupEvent,
} from '@webal-nest/contracts';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('main-admin')
  async createMainAdmin(@Body() dto: MainAdminCreateDto) {
    return await this.rmqService.send<
      AuthCreateMainAdmin.Request,
      AuthCreateMainAdmin.Response
    >(AuthCreateMainAdmin.topic, dto);
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return this.rmqService.send<AuthSignIn.Request, AuthSignIn.Response>(
      AuthSignIn.topic,
      dto
    );
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    const { token, emailToken } = await this.rmqService.send<
      AuthSignup.Request,
      AuthSignup.Response
    >(AuthSignup.topic, dto);

    this.rmqService.notify<AuthSignupEvent.Request>(AuthSignupEvent.topic, {
      emailToken,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return { token };
  }
}
