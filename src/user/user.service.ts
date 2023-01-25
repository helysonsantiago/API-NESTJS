import { Injectable, HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { User } from './entities/user.entity';
import * as argon from 'argon2';
import { DeleteAdminDto } from './dto/delete-user&admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //CREATE A NEW USER
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await argon.hash(createUserDto.password);

    try {
      const admin = await this.userRepository.save({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hash,
      });
      delete admin.password;
      return admin;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: [
            'Serviço temporariamente indisponível, contate o administrador do sistema.',
            'Código[1PN]',
          ],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  //GET ALL USERS
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        select: ['id', 'name', 'active'],
      });
      return users;
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

  //GET A USER
  async findOne(id: number): Promise<User> {
    try {
      const aUser = await this.userRepository.findOneBy({ id });
      delete aUser.password;
      return aUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Usuário não encontrado',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  //UPDATED A USER
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userUpdated = await this.userRepository.update(id, {
        name: updateUserDto.name,
        password: updateUserDto.password,
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

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const userUpdated = await this.userRepository.update(id, {
        name: updateAdminDto.name,
        password: updateAdminDto.password,
        role: updateAdminDto.role,
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

  //INACTIVE A USER
  async remove(id: number, deleteAdminDto: DeleteAdminDto) {
    const removeUser = await this.userRepository.update(id, {
      role: deleteAdminDto.role,
      active: deleteAdminDto.active,
    });
    return removeUser;
  }
}
