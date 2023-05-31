import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, userLoginDto } from './user.dto';
import { Users } from 'src/entities/user. entity';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('유저의 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성하지', type: Users })
  @UseInterceptors(ClassSerializerInterceptor)
  async createOne(@Body() createuserdto: CreateUserDto) {
    return await this.usersService.createOne(createuserdto);
  }

  @Get('/:userid')
  @ApiOperation({ summary: '유저정보 확인', description: 'hiyeao' })
  @ApiCreatedResponse({ description: '유저를 check', type: Users })
  @ApiParam({
    name: 'user_id',
    required: true,
    description: '유저의 정보를 찾고싶을때 사용',
  })
  findUserInfo(@Param('userid') userId: number): Promise<Users> {
    return this.usersService.findUserInfo(userId);
  }

  @Post('login')
  async login(@Body() userLoginDto: userLoginDto) {
    return this.usersService.login(userLoginDto);
  }
}
