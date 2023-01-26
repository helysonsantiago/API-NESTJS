import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Insira um nome da empresa.' })
  @IsOptional()
  company?: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira uma descrição' })
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Informe o status' })
  @IsOptional()
  status?: boolean;
}
