// import { INTRATETDMULTI } from './deposit-intrest-rate.entity';
// import { INTRATELOAN } from './interest-rate-for-loan-and-cc.entity';
// import { INTRATETD } from './interest-rate-for-term-deposit.entity';
// import { INTRATEPATSCHEMES } from './pat-scheme-interest-rates.entity';
// import { INTRATESBPG } from './saving-and-pigmy-interest-rates.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DPMASTER } from './dpmaster.entity'
@Entity()
export class INTCATEGORYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100 })
  NAME: string;

  @Column({ nullable: true })
  ACNOTYPE: string;

  @OneToMany(() => DPMASTER, interestCategory => interestCategory.intCategory, {
    cascade: ["insert", "update"]
  })
  interestCategory: DPMASTER[];


  // @OneToMany(() => INTRATETD, idftd => idftd.category, {
  //   cascade: ["insert", "update"]
  // })
  // idftd: INTRATETD[];

  // @OneToMany(() => INTRATEPATSCHEMES, patdeposit => patdeposit.category, {
  //   cascade: ["insert", "update"]
  // })
  // patdeposit: INTRATEPATSCHEMES[];

  // @OneToMany(() => INTRATESBPG, sapintrate => sapintrate.category, {
  //   cascade: ["insert", "update"]
  // })
  // sapintrate: INTRATESBPG[];

  // @OneToMany(() => INTRATELOAN, loanandcc => loanandcc.category, {
  //   cascade: ["insert", "update"]
  // })
  // loanandcc: INTRATELOAN[];

  // @OneToMany(() => INTRATETDMULTI, depointrate => depointrate.INT_CATEGORY, {
  //   cascade: ["insert", "update"]
  // })
  // depointrate: INTRATETDMULTI[];
}
