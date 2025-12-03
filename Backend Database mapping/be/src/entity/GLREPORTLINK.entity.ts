import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GLREPORTLINK {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  REPORT_TYPE: string;

  @Column({ nullable: true })
  CODE: string;

  @Column({ nullable: true })
  CODE_TYPE: string;

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column({ nullable: true })
  AC_TYPE: number;

  @Column({ length: 15 })
  AC_NO: string;

  @Column({ nullable: true })
  SUB_COLUMN_NO: number;

  @Column({ nullable: true })
  EFFECT_DATE: string;

  @Column({ nullable: true })
  REVERSE_CODE: string;

  @Column({ nullable: true })
  DEFAULT_BALTYPE: string;

  @Column({ nullable: true })
  EFFECT_TO_DATE: string;
}
