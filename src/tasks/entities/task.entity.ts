import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  @Column()
  ownerId: number;

  @Column()
  company: string;

  @Column()
  description: string;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
