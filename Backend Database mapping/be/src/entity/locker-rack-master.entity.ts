import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
@Entity()
export class LOCKERRACKMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  RACK_NO: number;

  @Column({ length: 50 })
  RACK_DESC: string;

  @Column()
  LOCKER_FROMNO: string

  @Column()
  LOCKER_TONO: string

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(() => OWNBRANCHMASTER, (BranchCodeMaster) => BranchCodeMaster.locker, {
    cascade: true
  })
  @JoinColumn({ name: "BRANCH_CODE" })
  BranchCodeMaster: OWNBRANCHMASTER[];
}
