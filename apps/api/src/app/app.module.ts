import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJWTConfig } from './config/jwt.config';
import { getRMQConfig } from './config/rmq.config';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/api.env' }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [JwtStrategy],
})
export class AppModule {}
