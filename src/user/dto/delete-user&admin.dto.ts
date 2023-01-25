import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class DeleteAdminDto {

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  role: string;
}
