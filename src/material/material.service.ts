import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  //CREATE A MATERIAL
  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    try {
      const newTask = await this.materialRepository.save({
        company: createMaterialDto.company,
        materials: createMaterialDto.materials,
        ownerId: createMaterialDto.ownerId,
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

  //GET ALL MATERIALS
  async findAll(): Promise<Material[]> {
    try {
      const materials = await this.materialRepository.find();
      return materials;
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

  //GET A MATERIAL
  async findOne(id: number): Promise<Material> {
    try {
      const aMaterial = await this.materialRepository.findOneBy({ id });
      return aMaterial;
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

  //UPDATED A MATERIAL
  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    try {
      const materialUpdated = await this.materialRepository.update(id, {
        company: updateMaterialDto.company,
        materials: updateMaterialDto.materials,
        status: updateMaterialDto.status,
      });
      return materialUpdated;
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
