import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserType } from 'src/tpye/user.tpye';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: UserType) {
    const payload: UserType = user;
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
}
