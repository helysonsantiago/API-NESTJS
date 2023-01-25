/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST, // Your URL
  port: 5432,
  username: process.env.USER,     // Your USERDB
  password: process.env.PASSWORD, // Your PASSWORD
  database: process.env.DATABASE, // Your DATABASE
  entities: [User, Task],
  synchronize: true,
  autoLoadEntities: true,
};
