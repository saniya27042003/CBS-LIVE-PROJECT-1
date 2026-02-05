//import { BANKBRANCHMASTER } from './BANKBRANCHMASTER.entity';
//import { BATCHVOUCHERTRAN } from './BATCHVOUCHERTRAN.entity';
//import { BRANCHWISEDIVIDEND } from './BRANCHWISEDIVIDEND.entity';
//import { CASHREMITRAN } from './CASHREMITRAN.entity';
//import { CHEQUEBOOKISSUED } from './CHEQUEBOOKISSUED.entity';
//import { CHEQUECOLLECTTRAN } from './CHEQUECOLLECTTRAN.entity';
//mport { ITEMMASTER } from './dead-stock-master.entity';
import { DPMASTER } from './dpmaster.entity';
//import { PGMASTER } from './pgmaster.entity';
//import { SHMASTER } from './share-master.entity';
//import { LNMASTER } from './term-loan-master.entity';
import { ACMASTER } from './gl-account-master.entity';
//import { MORATORIUMPERIOD } from './moratorium-peroid-master.entity';
//import { CHARGESNOTING } from './CHARGESNOTING.entity';
// import { BOOKDEBTS } from './book-debts.entity';
// import { SECINSURANCE } from './customer-insurance.entity';
// import { FIREPOLICY } from './fire-policy.entity';
// import { FURNITURE } from './furniture-and-fixture.entity';
// import { GOLDSILVER } from './gold-and-silver.entity';
// import { GOVTSECULIC } from './govt-security-and-lic.entity';
// import { LANDBUILDING } from './land-and-buildings.entity';
// import { MARKETSHARE } from './market-shares.entity';
// import { OTHERSECURITY } from './other-security.entity';
// import { OWNDEPOSIT } from './own-deposits.entity';
// import { PLANTMACHINARY } from './plant-and-machinery.entity';
// import { PLEDGESTOCK } from './pleadge-stock.entity';
// import { STOCKSTATEMENT } from './stock-statement.entity';
// import { VEHICLE } from './vehicle.entity';
//import { PIGMYCHART } from './pigmy-chart.entity';
import { SYSPARA } from './system-master-parameters.entity';
// import { USERDEFINATION } from 'src/utility/user-defination/entity/user-defination.entity';
import { Column, Entity,  JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
//import { INTINSTRUCTION } from './interest-instruction.entity'
// import { COMPANYGROUPLINKMASTER } from './company-group-link-master.entity';
// import { COMPANYGROUPMASTER } from './company-group-master.entity';
// import { DEPRCATEGORY } from './depriciation-category-master.entity';
// import { DIRECTORMASTER } from './director-master.entity';
// import { LOCKERRACKMASTER } from './locker-rack-master.entity';
// import { LOCKERMASTER } from './locker-rackwise-master.entity';
// import { LOCKERSIZE } from './locker-size-master.entity';
//import { SALARYDIVISIONMASTER } from './salary-division-master.entity';
// import { SUBSALARYMASTER } from './sub-salary-division-master.entity';
// import { USERDEFINATION } from './USERDEFINATION.entity';
//import { DIVBRANCHMASTER } from './DIVBRANCHMASTER.entity';

@Entity()
export class OWNBRANCHMASTER {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;



  @Column()
  CODE: number;

  @Column({ length: 100 })
  NAME: string;

  // @Column({ nullable: true, length: 15 })
  // AC_NO: string;

  // @OneToMany(type => USERDEFINATION, user => user.branch)
  // user: USERDEFINATION

  @Column({ nullable: true })
  sysparaId: number;


  @ManyToOne(() => SYSPARA, { nullable: true })
@JoinColumn({ name: 'sysparaId' })
syspara?: SYSPARA;


@OneToMany(() => DPMASTER, dp => dp.BranchCodeMaster)
branchcode: DPMASTER[];

@OneToMany(() => DPMASTER, dp => dp.BranchMaster)
branch: DPMASTER[];

// @OneToMany(() => PGMASTER, pg => pg.BranchCodeMaster)
// branchCodePG: PGMASTER[];

// @ManyToOne(() => DIVBRANCHMASTER, div => div.ownBranches)
// divBranch: DIVBRANCHMASTER;

//  @OneToMany(() => ITEMMASTER, item => item.branch)
//   items: ITEMMASTER[];


  // @OneToMany(() => LNMASTER, (branchCodeLN) => branchCodeLN.BranchCodeMaster)
  // branchCodeLN: LNMASTER[];

  // @OneToMany(() => SHMASTER, (divBranch) => divBranch.divBranchMaster)
  // divBranch: SHMASTER


  // @OneToMany(() => PIGMYCHART, pigmy => pigmy.branch)
  // pigmyCharts: PIGMYCHART[];

  @Column({ nullable: true })
  AC_NO: string;


@ManyToOne(() => ACMASTER, accNo => accNo.ownBranches, {
  cascade: true,
})
@JoinColumn({ name: 'AC_NO' })
accNo: ACMASTER;



  // @OneToMany(() => INTINSTRUCTION, (branchCodeIns) => branchCodeIns.BranchCode)
  // branchCodeIns: INTINSTRUCTION

  // @OneToMany(() => SALARYDIVISIONMASTER, salarydiv => salarydiv.branch, {
  //   cascade: ["insert", "update"]
  // })
  // salarydiv: SALARYDIVISIONMASTER[];


  // @OneToMany(() => BANKBRANCHMASTER, (BBranchMaster) => BBranchMaster.BBranchMaster)
  // BBranchMaster: BANKBRANCHMASTER

  // @OneToMany(() => BATCHVOUCHERTRAN, (voucherBranch) => voucherBranch.voucherBranch)
  // voucherBranch: BATCHVOUCHERTRAN

  // @OneToMany(() => BRANCHWISEDIVIDEND, (branchDividend) => branchDividend.branchDividend)
  // branchDividend: BRANCHWISEDIVIDEND

  // @OneToMany(() => CASHREMITRAN, (cashTran) => cashTran.cashTran)
  // cashTran: CASHREMITRAN

  // @OneToMany(() => CHEQUEBOOKISSUED, (chequebook) => chequebook.chequebook)
  // chequebook: CHEQUEBOOKISSUED

  // @OneToMany(() => CHEQUECOLLECTTRAN, (chequeCollection) => chequeCollection.chequeCollection)
  // chequeCollection: CHEQUECOLLECTTRAN

  // @OneToMany(() => MORATORIUMPERIOD, (moratoriumBranch) => moratoriumBranch.moratoriumBranch)
  // moratoriumBranch: MORATORIUMPERIOD

  // @OneToMany(() => CHARGESNOTING, (notingChargeBranch) => notingChargeBranch.notingChargeBranch)
  // notingChargeBranch: CHARGESNOTING


  // @OneToMany(() => DIRECTORMASTER, (director) => director.BranchCodeMaster)
  // director: DIRECTORMASTER

  // @OneToMany(() => LOCKERRACKMASTER, (locker) => locker.BranchCodeMaster)
  // locker: LOCKERRACKMASTER

  // @OneToMany(() => LOCKERSIZE, (lockersize) => lockersize.BranchCodeMaster)
  // lockersize: LOCKERSIZE

  // @OneToMany(() => LOCKERMASTER, (lockerwise) => lockerwise.BranchCodeMaster)
  // lockerwise: LOCKERMASTER

  // @OneToMany(() => DEPRCATEGORY, (depre) => depre.BranchCodeMaster)
  // depre: DEPRCATEGORY

  // @OneToMany(() => SUBSALARYMASTER, (subsal) => subsal.BranchCodeMaster)
  // subsal: SUBSALARYMASTER

//   @OneToMany(() => COMPANYGROUPMASTER, (comapny) => comapny.BranchCodeMaster)
//   comapny: COMPANYGROUPMASTER

//   @OneToMany(() => COMPANYGROUPLINKMASTER, (comapnylink) => comapnylink.BranchCodeMaster)
//   comapnylink: COMPANYGROUPLINKMASTER

// @OneToMany(() => OWNDEPOSIT, o => o.branch)
// owndeposits: OWNDEPOSIT[];



  // @OneToMany(() => FIREPOLICY, (firebranchcode) => firebranchcode.firebranchcode)
  // firebranchcode: FIREPOLICY

  // @OneToMany(() => BOOKDEBTS, (bookbrach) => bookbrach.bookbrach)
  // bookbrach: BOOKDEBTS

  // @OneToMany(() => SECINSURANCE, (secinsubranch) => secinsubranch.secinsubranch)
  // secinsubranch: SECINSURANCE

  // @OneToMany(() => FURNITURE, (furniturebranchcode) => furniturebranchcode.furniturebranchcode)
  // furniturebranchcode: FURNITURE

  // @OneToMany(() => GOLDSILVER, (goldsilverbranchcode) => goldsilverbranchcode.goldsilverbranchcode)
  // goldsilverbranchcode: GOLDSILVER

  // @OneToMany(() => GOVTSECULIC, (govtsecbranchcode) => govtsecbranchcode.govtsecbranchcode)
  // govtsecbranchcode: GOVTSECULIC

  // @OneToMany(() => LANDBUILDING, (landbranchcode) => landbranchcode.landbranchcode)
  // landbranchcode: LANDBUILDING

  // @OneToMany(() => MARKETSHARE, (marketbranchcode) => marketbranchcode.marketbranchcode)
  // marketbranchcode: MARKETSHARE

  // @OneToMany(() => OTHERSECURITY, (othersecbranchcode) => othersecbranchcode.othersecbranchcode)
  // othersecbranchcode: OTHERSECURITY

  // @OneToMany(() => PLANTMACHINARY, (plantbranchcode) => plantbranchcode.plantbranchcode)
  // plantbranchcode: PLANTMACHINARY

  // @OneToMany(() => PLEDGESTOCK, (pleadgebranchcode) => pleadgebranchcode.pleadgebranchcode)
  // pleadgebranchcode: PLEDGESTOCK

  // @OneToMany(() => STOCKSTATEMENT, (stockbranchcode) => stockbranchcode.stockbranchcode)
  // stockbranchcode: STOCKSTATEMENT

  // @OneToMany(() => VEHICLE, (vehiclebranchcode) => vehiclebranchcode.vehiclebranchcode)
  // vehiclebranchcode: VEHICLE

}
