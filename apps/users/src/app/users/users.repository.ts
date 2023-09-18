import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IUser, UserRole } from '@webal-nest/interfaces';
import moment from 'moment';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  private async createPasswordHash(password: string) {
    const salt = await genSalt(6);
    return await hash(password, salt);
  }

  async validatePassword(password: string, hash: string) {
    return compare(password, hash);
  }

  async signUser(user: Partial<IUser>) {
    return await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        deleted: user.deleted,
      },
      { expiresIn: '14d' }
    );
  }

  async readJWT(token: string) {
    return this.jwtService.decode(token);
  }

  async createAdmin(admin: Partial<IUser>) {
    const user = this.userRepo.create({
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: admin.role,
      emailApproved: true,
      isActive: true,
      password: await this.createPasswordHash(admin.password),
    });

    const createdAdmin = await this.userRepo.save(user);
    return {
      token: await this.signUser(createdAdmin),
    };
  }

  async createUser(dto: Partial<IUser>) {
    const user = this.userRepo.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: UserRole.User,
      password: await this.createPasswordHash(dto.password),
      emailToken: (Math.random() + 1).toString(36).substring(2),
    });

    const createdUser = await this.userRepo.save(user);

    return {
      token: await this.signUser(createdUser),
      emailToken: createdUser.emailToken,
      id: createdUser.id,
    };
  }

  async mainAdminExists() {
    const user = await this.userRepo.findOneBy({ role: UserRole.MainAdmin });
    return !!user;
  }

  async load(id: string) {
    return this.userRepo.findOne({
      where: { id },
      select: [
        'id',
        'avatar',
        'email',
        'firstName',
        'lastName',
        'role',
        'phone',
        'isActive',
        'deleted',
        'createdAt',
      ],
    });
  }

  async checkExists(email: string) {
    return this.userRepo.findOne({ where: { email }, select: ['id', 'email'] });
  }

  async findOneByQuery(query: object) {
    return this.userRepo.findOneBy(query);
  }

  async updateOne(id: number, toUpdate: object) {
    return this.userRepo.update(id, toUpdate);
  }

  async login(user: IUser) {
    return {
      token: await this.signUser(user),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      approved: user.approved,
      emailConfirmed: user.emailApproved,
      avatar: user.avatar,
    };
  }

  async createRestoreToken(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user || user.deleted) throw 'User not found or was deleted';

    user.restoreToken = await genSalt(20);
    user.restoreExpires = moment().add(30, 'minutes').toDate();

    await this.userRepo.save(user);
    return user.restoreToken;
  }

  async updatePassword(user: IUser, password: string) {
    const newPassword = await this.createPasswordHash(password);
    await this.userRepo.update(user.id, { password: newPassword });
  }

  async findAndCount(query: object) {
    return this.userRepo.findAndCount(query);
  }

  async find(query: object) {
    return this.userRepo.findBy(query);
  }
}
