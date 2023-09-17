import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from './users.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}
}
