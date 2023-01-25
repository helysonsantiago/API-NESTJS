import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { Put } from '@nestjs/common/decorators';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DeleteAdminDto } from './dto/delete-user&admin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.userService.updateAdmin(id, updateAdminDto);
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Body() deleteAdminDto: DeleteAdminDto) {
    return this.userService.remove(+id, deleteAdminDto);
  }
}
