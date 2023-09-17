import { IsEmail, IsString } from 'class-validator';
import { IsPasswordRequirementsValid } from '@webal-nest/decorators';

export class MainAdminCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsPasswordRequirementsValid()
  password: string;
}
