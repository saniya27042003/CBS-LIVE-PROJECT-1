import { timeStamp } from 'console';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLEDATAMASTER } from './ROLEDATAMASTER.entity';

@Entity()
export class ROLEHASPERMISSION {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Menus: String;

  @Column()
  roleID: number;

  @OneToOne((type) => ROLEDATAMASTER)
  @JoinColumn({ name: 'roleID' })
  Role: ROLEDATAMASTER;
}
