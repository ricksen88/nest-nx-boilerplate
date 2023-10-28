import { IsString, IsEmail } from 'class-validator';
import { IsPasswordRequirementsValid } from '@webal-nest/decorators';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsPasswordRequirementsValid()
  password: string;
}
