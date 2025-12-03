import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGSUBJECTDETAILS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MEETING_NO: number;

  @Column()
  MEETING_YEAR: number;

  @Column({ nullable: true })
  SUB_SRNO: number;

  @Column({ nullable: true })
  SUB_DESCRIPTION: string;

  @Column({ nullable: true })
  SUB_DATATYPE: number;

  @Column({ nullable: true })
  SUB_INTRODUCER: string;

  @Column({ nullable: true })
  SUB_SUPPORTER: string;

  @Column()
  DIR_FOR: string;

  @Column({ nullable: true })
  DIR_AGAINST: string;

  @Column({ nullable: true })
  RESSOLUTION: string;

  @Column({ nullable: true })
  TABLENAME: string;
}
