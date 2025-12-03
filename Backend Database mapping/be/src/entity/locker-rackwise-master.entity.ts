import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LOCKERSIZE } from './locker-size-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
@Entity()
export class LOCKERMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  RACK_NO: number;

  @Column()
  LOCKER_NO: number;

  @Column()
  KEY_NO: string;

  @Column()
  SIZE_SR_NO: number;
  @ManyToOne(() => LOCKERSIZE, (rack) => rack.rackwise, {
    cascade: true,
  })
  @JoinColumn({ name: 'SIZE_SR_NO' })
  rack: LOCKERSIZE[];

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BranchCodeMaster) => BranchCodeMaster.lockerwise,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER[];
}
