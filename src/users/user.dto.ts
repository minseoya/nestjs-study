import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'id', example: '1000' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ description: 'user name', example: 'minseo' })
  @IsString()
  readonly names: string;

  @ApiProperty({ description: 'email', example: '1234@gmail.com' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'password', example: '23231@!f' })
  @IsString()
  passwords: string;

  @ApiProperty({ description: 'phoneNumber', example: '01032132331' })
  @IsString()
  readonly phoneNumber: string;
}

export class userLoginDto {
  @ApiProperty({ description: 'user email', example: 'minseo@gmail.com' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'password', example: '23231@!f' })
  @IsString()
  readonly passwords: string;
}
