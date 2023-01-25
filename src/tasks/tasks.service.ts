import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = await this.taskRepository.save({
        company: createTaskDto.company,
        description: createTaskDto.description,
        status: createTaskDto.status,
        ownerId: createTaskDto.ownerId,
      });

      return newTask;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Acesso negado',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }

  //GET ALL TASKS
  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find();
      return tasks;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'Serviço temporariamente indisponível, contate o administrador do sistema.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  //GET A TASK
  async findOne(id: number): Promise<Task> {
    try {
      const aTask = await this.taskRepository.findOneBy({ id });
      return aTask;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Tarefa não encontrada',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  //UPDATED A TASK
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const userUpdated = await this.taskRepository.update(id, {
        company: updateTaskDto.company,
        description: updateTaskDto.description,
        status: updateTaskDto.status,
      });
      return userUpdated;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Ação negada, contate o administrador do sistema.',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
