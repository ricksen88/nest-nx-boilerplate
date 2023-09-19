import { IsEmail, IsString } from 'class-validator';
import { IsPasswordRequirementsValid } from '@webal-nest/decorators';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsPasswordRequirementsValid()
  password: string;
}
