import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'Insira um nome válido.' })
  @IsNotEmpty({ message: 'Insira um nome.' })
  name: string;

  @IsEmail({}, { message: 'Insira um email válido.' })
  @IsNotEmpty({ message: 'Insira um email.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira uma senha.' })
  password: string;
}
