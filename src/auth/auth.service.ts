import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';
import { UserType } from 'src/tpye/user.tpye';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
  ) {}
  async login(user: UserType) {
    const payload = user;
    const accessToken = jwt.sign(payload, this.config.jwtSecret); //secretOrPrivateKey
    return { accessToken, id: user.id };
  }

  async vaildatePassword(passwords: string, hashedPassword: string) {
    const vaildateResult = await bcrypt.compare(passwords, hashedPassword);
    return vaildateResult;
  }

  async transformPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.config.jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        UserType;

      const { id, username } = payload;

      return {
        id,
        username,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
