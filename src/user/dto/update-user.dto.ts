import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Insira um nome válido.' })
  @IsNotEmpty({ message: 'Insira um nome.' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Insira uma senha válida.' })
  @IsNotEmpty({ message: 'Insira uma senha.' })
  @IsOptional()
  password?: string;
}
