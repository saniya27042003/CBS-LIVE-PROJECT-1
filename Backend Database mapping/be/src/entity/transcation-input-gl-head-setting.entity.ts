import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TRANINPUTHEAD {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  SERIAL_NO: number;

  @Column({ default: 0 })
  SCHEME_TYPE: string;

  @Column({ default: 0 })
  FIELD_AMOUNT: string;

  @Column({ default: 0 })
  FIELD_GL: string;

  @Column({ nullable: true, default: 0 })
  FIELD_INTEREST_DATE: string;

  @Column({ default: 0 })
  FIELD_TRAN_TABLE: string;

  @Column({ nullable: true, default: 0 })
  GL_CODE: number;

  @Column({ nullable: true, default: 0 })
  GL_CODE_FROM_SCHEME_FIELD: string;

  @Column({ nullable: true, default: 0 })
  DESCRIPTION: string;

  @Column({ nullable: true, default: 0 })
  SHORT_NAME: string;

  @Column({ default: 0 })
  CHECK_REQUIRE: string;

  @Column({ default: 0 })
  CHECK_BALANCE: string;

  @Column({ nullable: true, default: 0 })
  DRCR_APPLICABLE: string;

  @Column({ default: 0 })
  INTEREST_DATE_INPUT: string;

  @Column({ nullable: true, default: 0 })
  HEAD_TYPE: string;

  @Column({ default: 0 })
  IS_NOTING_REQUIRED: string;

  @Column({ default: 0 })
  IS_GLBAL_MAINTAIN: string;
}
