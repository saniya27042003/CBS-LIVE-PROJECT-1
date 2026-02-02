import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OWNBRANCHMASTER } from './own-branch-master.entity';

@Entity({ name: 'DIVBRANCHMASTER' })
export class DIVBRANCHMASTER {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OWNBRANCHMASTER, own => own.divBranch)
  ownBranches: OWNBRANCHMASTER[];
}
