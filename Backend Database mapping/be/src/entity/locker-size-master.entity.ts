import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LOCKERMASTER } from './locker-rackwise-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
@Entity()
export class LOCKERSIZE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SIZE_SR_NO: number;

  @Column({ length: 50 })
  SIZE_NAME: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  RENT: number;

  @OneToMany(() => LOCKERMASTER, rackwise => rackwise.rack, {
    cascade: ["insert", "update"]
  })
  rackwise: LOCKERMASTER[];

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(() => OWNBRANCHMASTER, (BranchCodeMaster) => BranchCodeMaster.lockersize, {
    cascade: true
  })
  @JoinColumn({ name: "BRANCH_CODE" })
  BranchCodeMaster: OWNBRANCHMASTER[];

}
