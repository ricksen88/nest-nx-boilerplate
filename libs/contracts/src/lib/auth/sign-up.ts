import { IsEmail, IsString } from 'class-validator';

export namespace AuthSignup {
  export const topic = 'auth.signup.command';

  export class Request {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;
  }

  export class Response {
    token: string;
    emailToken: string;
    id: string;
  }
}
