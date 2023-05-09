import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user. entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createOne(user: CreateUserDto) {
    return this.usersRepository.insert(user);
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
