import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IBCDETAILTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_NO: number;

  @Column({ nullable: true })
  SERIAL_NO: string;

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

  @Column({ nullable: true })
  TRAN_AMOUNT: number;

  @Column()
  TRAN_GLACNO: number;

  @Column()
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  HEAD_DESCRIPTION: string;
}
