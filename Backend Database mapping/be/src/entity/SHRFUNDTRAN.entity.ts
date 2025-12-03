import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SHRFUNDTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  TRAN_DATE: string;

  @Column()
  TRAN_NO: number;

  @Column()
  SERIAL_NO: number;

  @Column()
  TRAN_TIME: string;

  @Column()
  TRAN_MODE: string;

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @Column({ nullable: true })
  TRAN_DRCR: string;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column()
  TRAN_ACTYPE: number;

  @Column()
  TRAN_ACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ nullable: true })
  TRAN_GLACNO: number;

  @Column({ nullable: true })
  PAY_PERSON_NAME: string;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ nullable: true })
  DEATH_DATE: string;

  @Column({ nullable: true })
  RESOLUTION_DATE: string;

  @Column({ nullable: true })
  RESOLUTION_NO: string;

  @Column({ nullable: true })
  TRAN_ENTRY_TYPE: string;

  @Column({ nullable: true })
  TRAN_SOURCE_NO: number;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;
}
