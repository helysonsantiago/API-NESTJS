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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Role } from 'src/auth/role/role.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Roles(Role.ADMIN || Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }
}
