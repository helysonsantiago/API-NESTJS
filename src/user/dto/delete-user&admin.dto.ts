import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
export class DeleteAdminDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  role: number;
}
