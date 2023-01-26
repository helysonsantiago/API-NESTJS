import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Material } from './entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material]), AuthModule],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
