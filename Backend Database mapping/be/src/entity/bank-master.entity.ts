import { AUTODDNO } from './AUTODDNO.entity';
import { BANKBRANCHMASTER } from './BANKBRANCHMASTER.entity';
import { BANKCOMMISSION } from './BANKCOMMISSION.entity';
import { BANKDETAILS } from './BANKDETAILS.entity';
import { Column, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BANKMASTER {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  BANK_CODE: number;


  @Column({ length: 100 })
  BANK_NAME: string;


  @Column({ length: 25 })
  BANK_SHORTNAME: string;

  @Column({ nullable: true })
  LEDGER_CODE: string;


  @Column({ nullable: true, length: 3 })
  BANKCODE: string;

  @Column({ nullable: true, default: 0 })
  DD_APPLICABLE: string;

  @Column({ nullable: true, length: 6 })
  GL_ACNO: string;

  @Column({ nullable: true, length: 6 })
  HO_SUB_GLACNO: string;

  @Column({ nullable: true, default: 0 })
  BANKERS_COMM_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  RIGHT_TO_PREPARE_DD: string;

  @Column({ nullable: true, default: 0 })
  PARTICIPATE_IN_CLEARING: string;

  @OneToMany(() => AUTODDNO, (bankCode) => bankCode.bankCode, {
    cascade: ["insert", "update"]
  })
  bankCode: AUTODDNO[];

  @OneToMany(() => BANKBRANCHMASTER, (BankCode) => BankCode.BankCode, {
    cascade: ["insert", "update"]
  })
  BankCode: BANKBRANCHMASTER[];

  @OneToMany(() => BANKCOMMISSION, (bankComm) => bankComm.bankComm, {
    cascade: ["insert", "update"]
  })
  bankComm: BANKCOMMISSION[];

  // @OneToMany(() => BANKDETAILS, (bankDetails) => bankDetails.bankDetails, {
  //   cascade: ["insert", "update"]
  // })
  // bankDetails: BANKDETAILS[];
}
