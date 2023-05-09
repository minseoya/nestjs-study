import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { Users } from 'src/entities/user. entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createOne(@Body() user: CreateUserDto) {
    return this.usersService.createOne(user);
  }

  @Get('/:userid')
  findUserInfo(@Param('userid') userId: number): Promise<Users> {
    return this.usersService.findUserInfo(userId);
  }
}
