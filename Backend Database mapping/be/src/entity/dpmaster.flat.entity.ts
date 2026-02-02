import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NOMINEELINK } from './nominee.entity';
import { JointAcLink } from './joint-account.entity';
import { ATTERONEYLINK } from './atteroneylink.entity';

@Entity({ name: 'dpmaster' })
@Index('NDXDPMASTER', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'BANKACNO'])
@Index('NDXDPMASTER1', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'AC_NO'])
export class DPMASTER {


 // =======================
// CHILD RELATIONS (RUNTIME ONLY)
// =======================

@OneToMany(() => NOMINEELINK, n => n.dpmaster)
nomineeDetails?: NOMINEELINK[];


@OneToMany(() => JointAcLink, j => j.dpmaster)
jointAccounts?: JointAcLink[];

@OneToMany(() => ATTERONEYLINK, p => p.dpmaster)
powerOfAttorney?: ATTERONEYLINK[];



  /* ===================== CORE ===================== */

  @PrimaryColumn({
  type: 'varchar',
  length: 20,
  generated: false,
})
BANKACNO: string;


  @Column()
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;

  @Column()
  AC_NO: number;

  @Column({ nullable: true })
  AC_NAME: string;

  /* ===================== CATEGORY / FLAGS ===================== */

  @Column({ nullable: true })
  AC_CATG: number;

  @Column({ nullable: true })
  AC_BALCATG: number;

  @Column({ nullable: true })
  AC_OPR_CODE: number;

  @Column({ nullable: true })
  AC_CUSTID: number;

  @Column({ nullable: true })
  AC_INTCATA: number;


  

  /* ===================== DATES ===================== */

  @Column({ nullable: true })
  AC_OPDATE: string;

  @Column({ nullable: true })
  AC_MBDATE: string;

  /* ===================== AMOUNTS ===================== */

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SCHMAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_PAYABLEAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_INTERESTAMT: number;

  /* ===================== REFERENCES ===================== */

  @Column({ nullable: true })
  BRANCH_CODE: number;

  /* ===================== SYSTEM ===================== */

  @CreateDateColumn()
  SYSADD_DATETIME: Date;

  @UpdateDateColumn()
  SYSCHNG_DATETIME: Date;

  @Column({ default: 1 })
  status: number;
}
