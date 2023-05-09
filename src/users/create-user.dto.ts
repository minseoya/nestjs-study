import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly names: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly passwords: string;

  @IsString()
  readonly phone_number: string;
}
