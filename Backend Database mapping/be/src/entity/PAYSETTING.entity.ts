import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PAYSETTING {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_TYPE: string;

  @Column({ nullable: true })
  AMT_TYPE: string;

  @Column({ nullable: true })
  PAY_FIELD: string;

  @Column({ nullable: true })
  BANK_FIELD: string;
}
