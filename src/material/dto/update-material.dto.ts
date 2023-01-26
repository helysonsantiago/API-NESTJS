import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class UpdateMaterialDto {
  @IsString()
  @IsNotEmpty({ message: 'Insira o nome da empresa.' })
  company: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira um material EX: "Mouse"' })
  materials: string[];

  @IsBoolean()
  @IsNotEmpty({ message: 'Informe o status' })
  status: boolean;
}
