import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Insira um nome da empresa.' })
  company: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira uma descrição' })
  description: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Informe o status' })
  status: boolean;

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
