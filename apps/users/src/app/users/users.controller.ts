import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from './users.service';
import { UserLoad } from '@webal-nest/contracts';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RMQValidate()
  @RMQRoute(UserLoad.topic)
  async loadUser(@Body() dto: UserLoad.Request): Promise<UserLoad.Response> {
    return { user: await this.userService.loadUser(dto.id) };
  }
}
