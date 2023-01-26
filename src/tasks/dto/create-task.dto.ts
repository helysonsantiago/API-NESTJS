import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Insira o nome da empresa.' })
  company: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira uma descrição' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
