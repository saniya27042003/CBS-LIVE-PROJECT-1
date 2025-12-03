import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGDAVADETAILS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MEETING_NO: number;

  @Column()
  MEETING_YEAR: number;

  @Column({ nullable: true })
  SUB_SRNO: number;

  @Column({ nullable: true })
  AC_SRNO: number;

  @Column({ nullable: true })
  AC_NAME: string;

  @Column({ nullable: true })
  LOAN_TYPE: string;

  @Column({ nullable: true })
  DUEDATE: string;

  @Column({ nullable: true })
  LOANAMOUNT: number;

  @Column({ nullable: true })
  OVERDUEAMOUNT: number;

  @Column({ nullable: true })
  DAVA_AMOUNT: number;

  @Column({ nullable: true })
  RESSOLUTION: string;
}
