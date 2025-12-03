import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CRARTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  TRAN_DATE: string;

  @Column({ nullable: true })
  REPORT_TYPE: string;

  @Column({ nullable: true })
  TRAN_CRARCODE: string;

  @Column({ nullable: true })
  TRAN_AMOUNT: string;
}
