import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from './users.service';
import {
  AuthCreateMainAdmin,
  AuthSignIn,
  AuthSignup,
} from '@webal-nest/contracts';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @RMQValidate()
  @RMQRoute(AuthCreateMainAdmin.topic)
  async createMainAdmin(
    @Body() dto: AuthCreateMainAdmin.Request
  ): Promise<AuthCreateMainAdmin.Response> {
    return this.userService.createMainAdmin(dto);
  }

  @RMQValidate()
  @RMQRoute(AuthSignIn.topic)
  async signIn(@Body() dto: AuthSignIn.Request): Promise<AuthSignIn.Response> {
    return this.userService.signIn(dto);
  }

  @RMQValidate()
  @RMQRoute(AuthSignup.topic)
  async signup(@Body() dto: AuthSignup.Request): Promise<AuthSignup.Response> {
    return this.userService.signUp(dto);
  }
}
