/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty({ message: 'Informe o email que você cadastrou' })
  email: string;

  @IsString({ message: 'informe uma senha válida.' })
  @IsNotEmpty({ message: 'Informe a senha que você cadastrou' })
  password: string;
}
