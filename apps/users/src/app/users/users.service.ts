import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCreateMainAdmin, AuthSignup } from '@webal-nest/contracts';
import { UserRole } from '@webal-nest/interfaces';
import moment from 'moment';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createMainAdmin(dto: AuthCreateMainAdmin.Request) {
    const mainAdminExists = await this.userRepo.mainAdminExists();
    if (mainAdminExists) throw new Error('400: Main Admin is already created');
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
    if (!user) throw new Error('404: User not found');

    const passwordValid = await this.userRepo.validatePassword(
      password,
      user.password
    );
    if (!passwordValid)
      throw new Error('404: User not found or wrong password');

    if (user.deleted || !user.isActive)
      throw new Error('400: User was deleted');

    return this.userRepo.login(user);
  }

  async signUp(dto: AuthSignup.Request) {
    const user = await this.userRepo.findOneByQuery({ email: dto.email });
    if (user) throw new Error('400: User with this email already exists');

    return await this.userRepo.createUser(dto);
  }

  async confirmEmail(emailToken: string) {
    const user = await this.userRepo.findOneByQuery({
      emailToken,
      emailApproved: false,
    });

    if (!user) throw new Error('400: User not found or already approved');

    this.userRepo.updateOne(user.id, { emailApproved: true });

    return { success: true };
  }

  async requestPasswordReset(email: string) {
    const token = await this.userRepo.createRestoreToken(email);

    return { token };
  }

  async resetPassword(token: string, password: string) {
    const user = await this.userRepo.findOneByQuery({ restoreToken: token });
    if (!user) throw new Error('404: User not found');

    if (moment().isAfter(user.restoreExpires))
      throw new Error('400: Token expired');

    await this.userRepo.updatePassword(user, password);

    return { success: true };
  }
}
