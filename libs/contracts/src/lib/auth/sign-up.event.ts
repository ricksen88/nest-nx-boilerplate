export namespace AuthSignupEvent {
  export const topic = 'auth.signup.event';

  export class Request {
    id?: string;
    lastName: string;
    firstName: string;
    email: string;
    emailToken?: string;
  }
}
