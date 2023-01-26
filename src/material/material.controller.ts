import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Role } from 'src/auth/role/role.enum';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, updateMaterialDto);
  }
}
