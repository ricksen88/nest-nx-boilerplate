import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserLoad } from '@webal-nest/contracts';
import { RMQService } from 'nestjs-rmq';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly rmqService: RMQService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ id }: { id: string }) {
    const { user } = await this.rmqService.send<
      UserLoad.Request,
      UserLoad.Response
    >(UserLoad.topic, { id });

    return user;
  }
}
