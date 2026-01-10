import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['ITEM_CODE'])
export class ITEMMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ITEM_TYPE: string;

  @Column()
  @Generated('increment')
  ITEM_CODE: number;

  @Column()
  ITEM_NAME: string;

  @Column()
  PURCHASE_DATE: string;

  @Column()
  DEPR_CATEGORY: string;

  @Column({ nullable: true })
  SUPPLIER_NAME: string;

  @Column({ default: 0 })
  PURCHASE_OP_QUANTITY: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, default: 0 })
  PURCHASE_RATE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PURCHASE_VALUE: number;

  @Column({ nullable: true })
  OP_BAL_DATE: string; 

  @Column({ default: 0 })
  OP_QUANTITY: number;

  @Column({ default: 0 })
  OP_BALANCE: number;

  @Column({ nullable: true })
  LAST_DEPR_DATE: string;

  @Column({ default: 0 })
  GL_ACNO: number;

  @Column({ default: 0 })
  PURCHASE_QUANTITY: number;

  @Column({ nullable: true })
  LAST_UNLOCK_DATE: string;

  @Column({ nullable: true })
  SYSCHNG_LOGIN: string;


  @Column({ nullable: true, default: 1 })
  status: number

  @Column()
  BRANCH_CODE: number;
  @ManyToOne(() => OWNBRANCHMASTER, (BranchCodeMaster) => BranchCodeMaster.branchCodeds, {
    cascade: true
  })
  @JoinColumn({ name: "BRANCH_CODE" })
  BranchCodeMaster: OWNBRANCHMASTER[];

}