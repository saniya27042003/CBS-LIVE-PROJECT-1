import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SHMASTER } from './share-master.entity';
@Entity()
export class HISTORYDIVIDEND {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  WARRENT_DATE: string;

  @Column({ nullable: true })
  WARRENT_NO: number;

  @Column({ nullable: true })
  DIV_FROM_YEAR: number;

  @Column({ nullable: true })
  DIV_TO_YEAR: number;

  @Column({ nullable: true })
  ACNOTYPE: string;

  @Column()
  ACTYPE: number;

  @Column({ length: 15 })
  AC_NO: string;

  @Column({ nullable: true })
  TOTAL_SHARES: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TOTAL_SHARES_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DIVIDEND_AMOUNT: number;

  @Column({ nullable: true })
  DIVIDEND_STATUS: number;

  @Column({ nullable: true })
  DIV_PAID_DATE: string;

  @Column({ nullable: true })
  DIV_TRANSFER_DATE: string;

  @Column({ nullable: true })
  DIV_TRANSFER_BRANCH: string;

  @Column({ nullable: true })
  DIV_TRANSFER_ACNOTYPE: string;

  @Column({ nullable: true })
  DIV_TRANSFER_ACTYPE: number;

  @Column({ length: 15 })
  DIV_TRANSFER_ACNO: string;

  @Column({ nullable: true })
  MEMBER_CLOSE_DATE: string;

  @Column({ nullable: true })
  TRAN_ENTRY_TYPE: string;

  @Column({ nullable: true })
  IS_LESS_EXPIRE_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  BONUS_AMOUNT: number;

  @Column({ nullable: true })
  AC_SALARYDIVISION_CODE: number;

  @Column({ nullable: true })
  SUB_SALARYDIVISION_CODE: number;

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @Column({ nullable: true })
  sharesID: number;

  @OneToOne(() => SHMASTER, (sharesId) => sharesId.shareDividend, {
    cascade: true,
  })
  @JoinColumn({ name: 'sharesID' })
  sharesId: SHMASTER[];
}
