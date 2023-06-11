import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';
import { UserType } from 'src/tpye/user.tpye';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: UserType) {
    const payload = user;
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
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
      const payload = this.jwtService.verify(jwtString) as (
        | jwt.JwtPayload
        | string
      ) &
        UserType;

      const { id, email } = payload;

      return {
        id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
