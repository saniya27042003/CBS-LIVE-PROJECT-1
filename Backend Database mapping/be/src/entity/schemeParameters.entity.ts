import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { LNMASTER } from './term-loan-master.entity';

@Entity()
export class SCHEMAST {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  S_ACNOTYPE!: string;

  @Column({ type: 'integer', nullable: true })
  S_APPL!: number;

  // @Column({ type: 'integer', nullable: true })
  // AC_TYPE!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  S_NAME!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  S_SHNAME!: string;

  @Column({ type: 'integer', nullable: true })
  S_GLACNO!: number;

  @Column({ type: 'integer', nullable: true })
  S_INT_ACNO!: number;

  @Column({ type: 'varchar', length: 1, nullable: true })
  IS_DEPO_LOAN!: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  S_INT_APPLICABLE!: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  POST_TO_INDIVIDUAL_AC!: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  S_RECEIVABLE_INT_ALLOW!: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  IS_INT_ON_RECINT!: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  IS_INT_ON_OTHERAMT!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  INTEREST_METHOD!: string;

  @Column({ type: 'integer', nullable: true })
  MIN_INT_LIMIT!: number;

  @Column({ type: 'numeric', nullable: true })
  S_PENAL_INT_RATE!: number;

  @Column({ type: 'numeric', nullable: true })
  MAX_LOAN_LMT!: number;

  @Column({ type: 'integer', nullable: true })
  DEFAULT_LOAN_PERIOD!: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  INSTALLMENT_METHOD!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  S_PRODUCT_DAY_BASE!: string;

  @Column({ type: 'integer', nullable: true })
  GL_ACNO!: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  MEMBER_TYPE!: string;

  @Column({ type: 'numeric', nullable: true })
  SHARES_FACE_VALUE!: number;

  @Column({ type: 'numeric', nullable: true })
  DIVIDEND_PERCENTAGE!: number;

  @OneToMany(() => LNMASTER, l => l.LNCCMaster)
  lncccode!: LNMASTER[];
}