import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Unique(['email'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude({ toPlainOnly: true })
  @Column({ default: 1 })
  role: number;

  @Column({ default: true })
  active: boolean;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  createdAt: string;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updatedAt: string;
}
