import { SECURITYMASTER } from './security-code.entity';
import { INSUARANCEMASTER } from './insurance-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FIREPOLICY {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;
  @ManyToOne(() => SCHEMAST, (fireactype) => fireactype.fireactype, {
    cascade: true
  })
  @JoinColumn({ name: "AC_TYPE" })

  fireactype: SCHEMAST[];

  @Column({ length: 15 })
  AC_NO: string;

  @Column({ nullable: true })
  SUBMISSION_DATE: string;

  @Column({ nullable: true })
  POLICY_DUE_DATE: string;

  @Column({ nullable: true })
  POLICY_NO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  POLICY_AMT: number;

  @Column({ nullable: true })
  POLICY_NATURE: string;

  @Column({ nullable: true })
  INSU_CO_CODE: number;
  @ManyToOne(() => INSUARANCEMASTER, (insurancemaster) => insurancemaster.insurancemaster, {
    cascade: true
  })
  @JoinColumn({ name: "INSU_CO_CODE" })
  insurancemaster: INSUARANCEMASTER[];

  @Column({ nullable: true })
  ADDRESS: string;

  @Column({ nullable: true })
  CITY: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PREMIUM: number;

  @Column({ nullable: true })
  PREMIUM_DUE_DATE: string;

  @Column({ nullable: true })
  SECU_CODE: number;
  @ManyToOne(() => SECURITYMASTER, (firepolicy) => firepolicy.firepolicy, {
    cascade: true
  })
  @JoinColumn({ name: "SECU_CODE" })
  firepolicy: SECURITYMASTER[];

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(() => OWNBRANCHMASTER, (firebranchcode) => firebranchcode.firebranchcode, {
    cascade: true
  })
  @JoinColumn({ name: "BRANCH_CODE" })
  firebranchcode: OWNBRANCHMASTER[];

}
