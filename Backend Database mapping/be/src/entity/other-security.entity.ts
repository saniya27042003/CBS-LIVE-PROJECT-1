import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OTHERSECURITY {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(() => OWNBRANCHMASTER)
  @JoinColumn({ name: "BRANCH_CODE" })
  othersecbranchcode: OWNBRANCHMASTER[];

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;
  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "AC_TYPE" })

  othersec: SCHEMAST[];

  @Column({ default: 0, length: 15 })
  AC_NO: string;

  @Column({ nullable: true })
  SECU_CODE: number;
  @ManyToOne(() => SECURITYMASTER, (other) => other.other, {
    cascade: true
  })
  @JoinColumn({ name: "SECU_CODE" })
  other: SECURITYMASTER[];

  @Column({ nullable: true })
  SR_NO: number;

  @Column({ nullable: true })
  SUBMISSION_DATE: string;

  @Column({ nullable: true })
  SHORT_DETAILS: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TOTAL_VALUE: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  MARGIN: number;

  @Column({ nullable: true })
  DETAILS: string;

  @Column({ nullable: true })
  SECURITY_TYPE: string;
}