import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDMASTER } from './customer-id.entity';
import { LNMASTER } from './term-loan-master.entity';

@Entity()
export class GUARANTERDETAILS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SERIAL_NO: number;

  @Column({ nullable: true })
  AC_TYPE: string;

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column({ nullable: true })
  AC_NO: string;

  @Column({ nullable: true })
  AC_NAME: string;

  @Column({ nullable: true })
  MEMBER_TYPE: string;

  @Column({ nullable: true })
  MEMBER_NO: string;

  @Column({ nullable: true })
  EXP_DATE: string;

  @Column({ nullable: true })
  GAC_CUSTID: string;

  @Column({ nullable: true })
  lnmasterID: number;
  @ManyToOne(() => LNMASTER, (lnmaster) => lnmaster.guaranterMaster, {
    cascade: true,
  })
  @JoinColumn({ name: 'lnmasterID' })
  lnmaster: LNMASTER[];
}
