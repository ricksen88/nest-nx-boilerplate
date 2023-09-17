import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
}
