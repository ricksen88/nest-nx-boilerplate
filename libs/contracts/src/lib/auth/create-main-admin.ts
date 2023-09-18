import { IsEmail, IsString } from 'class-validator';
import { IsPasswordRequirementsValid } from '@webal-nest/decorators';

export namespace AuthCreateMainAdmin {
  export const topic = 'auth.create-main-admin.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsPasswordRequirementsValid()
    password: string;
  }

  export class Response {
    token: string;
  }
}
