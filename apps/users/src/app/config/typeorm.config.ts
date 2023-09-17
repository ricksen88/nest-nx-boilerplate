import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../users/users.entity';

export const getTypeOrmConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      ssl: configService.get('DB_SSL') === 'true',
      database: configService.get('DB_NAME'),
      synchronize: configService.get('DB_SYNC') === 'true',
      entities: [User],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};
