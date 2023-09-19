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

  async loadUser(id: string) {
    return this.userRepo.load(id);
  }

  async signIn({ email, password }: { email: string; password: string }) {
    const user = await this.userRepo.findOneByQuery({ email });
    if (!user) throw new Error('User not found or wrong password');

    const passwordValid = await this.userRepo.validatePassword(
      password,
      user.password
    );
    if (!passwordValid) throw new Error('User not found or wrong password');

    if (user.deleted || !user.isActive) throw new Error('User was deleted');

    return this.userRepo.login(user);
  }
}
