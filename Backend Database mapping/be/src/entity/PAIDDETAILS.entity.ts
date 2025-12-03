import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PAIDDETAILS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column({ nullable: true })
  AC_TYPE: string;

  @Column({ nullable: true })
  SHORT_NAME: string;

  @Column({ nullable: true })
  SERIAL_NO: number;

  @Column({ nullable: true })
  GLACNO: number;
}
