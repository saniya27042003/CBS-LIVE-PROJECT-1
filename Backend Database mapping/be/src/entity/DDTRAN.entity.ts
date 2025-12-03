import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DDTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @Column({ nullable: true })
  DRAFT_NO: string;

  @Column({ nullable: true })
  DRAWN_ON: string;

  @Column({ nullable: true })
  CITY_CODE: number;

  @Column({ nullable: true })
  TRAN_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AMT: number;

  @Column({ nullable: true })
  BANK_CODE: number;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;
}
