import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user. entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { userLoginDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private authService: AuthService,
  ) {}

  async createOne(userDto: CreateUserDto) {
    userDto.passwords = await this.authService.transformPassword(
      userDto.passwords,
    );

    return this.usersRepository.insert(userDto);
  }

  async findUserInfo(id: number): Promise<Users> {
    const user: Users = await this.usersRepository.findOne({
      where: { id: id },
    });
    return user;
  }

  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(userLoginDto: userLoginDto): Promise<{ accessToken: string }> {
    const { email, passwords } = userLoginDto;

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new UnauthorizedException('해당아이디 없음');

    const vaildateResult = await this.authService.vaildatePassword(
      passwords,
      user.passwords,
    );
    if (!vaildateResult)
      throw new UnauthorizedException('비밀번호가 잘못되었습니다.');

    return this.authService.login({ id: user.id, names: user.names });
  }
}
