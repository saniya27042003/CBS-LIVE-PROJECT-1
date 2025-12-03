import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MEETING_NO: number;

  @Column()
  MEETING_YEAR: number;

  @Column()
  TRAN_DATE: string;

  @Column()
  MEETING_DATE: string;

  @Column()
  MEETING_TIME: string;

  @Column({ nullable: true })
  MEETING_PLACE: string;

  @Column({ nullable: true })
  MEETING_TYPE: string;

  @Column({ nullable: true })
  MEETING_PRECIDENT: string;
}
