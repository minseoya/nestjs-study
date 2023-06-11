import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userLoginDto } from './dto/user.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/users/entities/user. entity';
import { AuthGuard } from 'src/auth/auth.guard';

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
  async login(
    @Body(ValidationPipe) userLoginDto: userLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.login(userLoginDto);
  }

  @UseGuards(AuthGuard)
  @Post('test')
  test(@Req() req) {
    console.log('req', req.user);
  }
}
