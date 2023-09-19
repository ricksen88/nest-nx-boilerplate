import { IUser } from '@webal-nest/interfaces';
import { IsUUID } from 'class-validator';

export namespace UserLoad {
  export const topic = 'user.load.command';

  export class Request {
    @IsUUID()
    id: string;
  }

  export class Response {
    user: IUser;
  }
}
