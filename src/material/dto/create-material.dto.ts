import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty({ message: 'Insira o nome da empresa.' })
  company: string;

  @IsString({ each: true })
  @IsNotEmpty({ message: 'Insira um material EX: "Mouse"' })
  materials: string[];

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
