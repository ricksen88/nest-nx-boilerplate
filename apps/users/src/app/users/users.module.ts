import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJWTConfig } from '../config/jwt.config';
import { UserController } from './users.controller';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(getJWTConfig()),
  ],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
  controllers: [UserController, AuthController],
})
export class UsersModule {}
