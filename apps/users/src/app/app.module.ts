import { Module } from '@nestjs/common';
import { getRMQConfig } from './config/rmq.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RMQModule } from 'nestjs-rmq';
import { getTypeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/users.env',
    }),
    TypeOrmModule.forRootAsync(getTypeOrmConfig()),
    RMQModule.forRootAsync(getRMQConfig()),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
