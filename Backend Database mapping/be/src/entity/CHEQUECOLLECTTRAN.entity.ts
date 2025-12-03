import { OWNBRANCHMASTER } from './own-branch-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CHEQUECOLLECTTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  SERIAL_NO: number;

  @Column()
  TRAN_NO: number;

  @Column()
  TRAN_YEAR: string;

  @Column()
  BRANCH_CODE: number;

  @Column({ nullable: true })
  AMT_TYPE: string;

  @Column()
  TRAN_DATE: string;

  @Column({ nullable: true })
  TRAN_TIME: string;

  @Column({ nullable: true })
  TRAN_DRCR: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column()
  TRAN_GLACNO: number;

  @Column()
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @ManyToOne(
    () => OWNBRANCHMASTER,
    (chequeCollection) => chequeCollection.chequeCollection,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  chequeCollection: OWNBRANCHMASTER[];
}
