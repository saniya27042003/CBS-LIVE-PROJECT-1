import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGSIGNDETAILS {
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
  AC_TYPE: string;

  @Column({ nullable: true })
  AUTHORITY: string;

  @Column({ nullable: true })
  RESSOLUTION: string;
}
