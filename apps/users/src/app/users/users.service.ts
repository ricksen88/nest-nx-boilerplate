import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCreateMainAdmin } from '@webal-nest/contracts';
import { UserRole } from '@webal-nest/interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createMainAdmin(dto: AuthCreateMainAdmin.Request) {
    const mainAdminExists = await this.userRepo.mainAdminExists();
    if (mainAdminExists) throw new Error('Main Admin is already created');
    return await this.userRepo.createAdmin({
      ...dto,
      role: UserRole.MainAdmin,
    });
  }
}
