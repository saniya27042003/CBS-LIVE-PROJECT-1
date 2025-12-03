import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class STANDINSTRUCTIONLOG {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_DATE: string;

  @Column({ nullable: true })
  TRAN_TIME: string;

  @Column({ nullable: true })
  INSTRUCTION_NO: number;

  @Column({ nullable: true })
  SUCCESS_STATUS: string;

  @Column({ nullable: true })
  DAILYTRAN_TRAN_NO: number;

  @Column()
  EXPECTED_EXECUTION_DATE: string;

  @Column({ nullable: true })
  PARTICULARS: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OVERDUE_INT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RECPAY_INT_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INTEREST_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PAYINT_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER9_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PENAL_INT_AMOUNT: number;
}
