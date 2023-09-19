import { IsEmail, IsString } from 'class-validator';
import { IsPasswordRequirementsValid } from '@webal-nest/decorators';

export namespace AuthSignIn {
  export const topic = 'auth.sign-in.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    @IsPasswordRequirementsValid()
    password: string;
  }

  export class Response {
    token: string;
  }
}
