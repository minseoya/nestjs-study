import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user. entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createOne(user: CreateUserDto) {
    await this.transformPassword(user);
    return this.usersRepository.insert(user);
  }

  async transformPassword(user: CreateUserDto): Promise<void> {
    user.passwords = await bcrypt.hash(user.passwords, 10);
    return Promise.resolve();
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
}
