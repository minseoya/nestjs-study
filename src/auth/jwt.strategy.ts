import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Users } from 'src/users/entities/user. entity';
import { UsersService } from 'src/users/users.service';
import { UserType } from 'src/tpye/user.tpye';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      secretOrKey: '1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: UserType) {
    const user: Users = await this.userService.findUserInfo(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
