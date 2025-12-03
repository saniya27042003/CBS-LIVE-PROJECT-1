import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FOLLOWUP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  SR_NO: number;

  @Column({ nullable: true })
  ENTRY_DATE: string;

  @Column({ nullable: true })
  FOLLOWUP_DATE: string;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column({ length: 15 })
  TRAN_ACNO: string;

  @Column()
  TRAN_ACTYPE: number;

  @Column({ nullable: true })
  FOLLOWUP_TAKEN_BY: string;

  @Column()
  DETAILS: string;

  @Column({ nullable: true })
  REMIND_HEADING: string;

  @Column({ nullable: true })
  REMIND_FROM_DATE: string;

  @Column({ nullable: true })
  REMIND_TO_DATE: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;
}
