import { BANKBRANCHMASTER } from './BANKBRANCHMASTER.entity';
import { BATCHVOUCHERTRAN } from './BATCHVOUCHERTRAN.entity';
import { BRANCHWISEDIVIDEND } from './BRANCHWISEDIVIDEND.entity';
import { CASHREMITRAN } from './CASHREMITRAN.entity';
import { CHEQUEBOOKISSUED } from './CHEQUEBOOKISSUED.entity';
import { CHEQUECOLLECTTRAN } from './CHEQUECOLLECTTRAN.entity';
import { ITEMMASTER } from './dead-stock-master.entity';
import { DPMASTER } from './dpmaster.entity';
import { PGMASTER } from './pgmaster.entity';
import { SHMASTER } from './share-master.entity';
import { LNMASTER } from './term-loan-master.entity';
import { ACMASTER } from './gl-account-master.entity';
import { MORATORIUMPERIOD } from './moratorium-peroid-master.entity';
import { CHARGESNOTING } from './CHARGESNOTING.entity';
import { BOOKDEBTS } from './book-debts.entity';
import { SECINSURANCE } from './customer-insurance.entity';
import { FIREPOLICY } from './fire-policy.entity';
import { FURNITURE } from './furniture-and-fixture.entity';
import { GOLDSILVER } from './gold-and-silver.entity';
import { GOVTSECULIC } from './govt-security-and-lic.entity';
import { LANDBUILDING } from './land-and-buildings.entity';
import { MARKETSHARE } from './market-shares.entity';
import { OTHERSECURITY } from './other-security.entity';
import { OWNDEPOSIT } from './own-deposits.entity';
import { PLANTMACHINARY } from './plant-and-machinery.entity';
import { PLEDGESTOCK } from './pleadge-stock.entity';
import { STOCKSTATEMENT } from './stock-statement.entity';
import { VEHICLE } from './vehicle.entity';
import { PIGMYCHART } from './pigmy-chart.entity';
import { SYSPARA } from './system-master-parameters.entity';
// import { USERDEFINATION } from 'src/utility/user-defination/entity/user-defination.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { INTINSTRUCTION } from './interest-instruction.entity';
import { COMPANYGROUPLINKMASTER } from './company-group-link-master.entity';
import { COMPANYGROUPMASTER } from './company-group-master.entity';
import { DEPRCATEGORY } from './depriciation-category-master.entity';
import { DIRECTORMASTER } from './director-master.entity';
import { LOCKERRACKMASTER } from './locker-rack-master.entity';
import { LOCKERMASTER } from './locker-rackwise-master.entity';
import { LOCKERSIZE } from './locker-size-master.entity';
import { SALARYDIVISIONMASTER } from './salary-division-master.entity';
import { SUBSALARYMASTER } from './sub-salary-division-master.entity';
import { USERDEFINATION } from './USERDEFINATION.entity';
@Entity()
export class OWNBRANCHMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CODE: number;

  @Column({ length: 100 })
  NAME: string;

  // @Column({ nullable: true, length: 15 })
  // AC_NO: string;

  @OneToMany((type) => USERDEFINATION, (user) => user.branch)
  user: USERDEFINATION;

  @Column({ nullable: true })
  sysparaId: number;
  @ManyToOne((type) => SYSPARA, (syspara) => syspara.branch)
  syspara: SYSPARA;

  @OneToMany((type) => DPMASTER, (branchcode) => branchcode.BranchCodeMaster)
  branchcode: DPMASTER;

  @OneToMany(() => DPMASTER, (branch) => branch.BranchMaster) BranchMaster;
  branch: DPMASTER;

  @OneToMany(() => PGMASTER, (branchCodePG) => branchCodePG.BranchCodeMaster)
  branchCodePG: PGMASTER;

  @OneToMany(() => SHMASTER, (branchCodesh) => branchCodesh.BranchCodeMaster)
  branchCodesh: SHMASTER;

  @OneToMany(() => ITEMMASTER, (branchCodeds) => branchCodeds.BranchCodeMaster)
  branchCodeds: ITEMMASTER;

  @OneToMany(() => LNMASTER, (branchCodeLN) => branchCodeLN.BranchCodeMaster)
  branchCodeLN: LNMASTER;

  @OneToMany(() => SHMASTER, (divBranch) => divBranch.divBranchMaster)
  divBranch: SHMASTER;

  @OneToMany(
    () => PIGMYCHART,
    (branchCodePigmyChart) => branchCodePigmyChart.BranchCode,
  )
  branchCodePigmyChart: PIGMYCHART;

  @Column({ nullable: true })
  AC_NO: string;

  @ManyToOne(() => ACMASTER, (accNo) => accNo.ownBranch, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_NO' })
  accNo: ACMASTER[];

  @OneToMany(() => INTINSTRUCTION, (branchCodeIns) => branchCodeIns.BranchCode)
  branchCodeIns: INTINSTRUCTION;

  @OneToMany(() => SALARYDIVISIONMASTER, (salarydiv) => salarydiv.branch, {
    cascade: ['insert', 'update'],
  })
  salarydiv: SALARYDIVISIONMASTER[];
  @OneToMany(
    () => BANKBRANCHMASTER,
    (BBranchMaster) => BBranchMaster.BBranchMaster,
  )
  BBranchMaster: BANKBRANCHMASTER;

  @OneToMany(
    () => BATCHVOUCHERTRAN,
    (voucherBranch) => voucherBranch.voucherBranch,
  )
  voucherBranch: BATCHVOUCHERTRAN;

  @OneToMany(
    () => BRANCHWISEDIVIDEND,
    (branchDividend) => branchDividend.branchDividend,
  )
  branchDividend: BRANCHWISEDIVIDEND;

  @OneToMany(() => CASHREMITRAN, (cashTran) => cashTran.cashTran)
  cashTran: CASHREMITRAN;

  @OneToMany(() => CHEQUEBOOKISSUED, (chequebook) => chequebook.chequebook)
  chequebook: CHEQUEBOOKISSUED;

  @OneToMany(
    () => CHEQUECOLLECTTRAN,
    (chequeCollection) => chequeCollection.chequeCollection,
  )
  chequeCollection: CHEQUECOLLECTTRAN;

  @OneToMany(
    () => MORATORIUMPERIOD,
    (moratoriumBranch) => moratoriumBranch.moratoriumBranch,
  )
  moratoriumBranch: MORATORIUMPERIOD;

  @OneToMany(
    () => CHARGESNOTING,
    (notingChargeBranch) => notingChargeBranch.notingChargeBranch,
  )
  notingChargeBranch: CHARGESNOTING;
  @OneToMany(() => DIRECTORMASTER, (director) => director.BranchCodeMaster)
  director: DIRECTORMASTER;

  @OneToMany(() => LOCKERRACKMASTER, (locker) => locker.BranchCodeMaster)
  locker: LOCKERRACKMASTER;

  @OneToMany(() => LOCKERSIZE, (lockersize) => lockersize.BranchCodeMaster)
  lockersize: LOCKERSIZE;

  @OneToMany(() => LOCKERMASTER, (lockerwise) => lockerwise.BranchCodeMaster)
  lockerwise: LOCKERMASTER;

  @OneToMany(() => DEPRCATEGORY, (depre) => depre.BranchCodeMaster)
  depre: DEPRCATEGORY;

  @OneToMany(() => SUBSALARYMASTER, (subsal) => subsal.BranchCodeMaster)
  subsal: SUBSALARYMASTER;

  @OneToMany(() => COMPANYGROUPMASTER, (comapny) => comapny.BranchCodeMaster)
  comapny: COMPANYGROUPMASTER;

  @OneToMany(
    () => COMPANYGROUPLINKMASTER,
    (comapnylink) => comapnylink.BranchCodeMaster,
  )
  comapnylink: COMPANYGROUPLINKMASTER;

  @OneToMany(() => OWNDEPOSIT, (owndeposit) => owndeposit.owndeposit)
  owndeposit: OWNDEPOSIT;

  @OneToMany(
    () => FIREPOLICY,
    (firebranchcode) => firebranchcode.firebranchcode,
  )
  firebranchcode: FIREPOLICY;

  @OneToMany(() => BOOKDEBTS, (bookbrach) => bookbrach.bookbrach)
  bookbrach: BOOKDEBTS;

  @OneToMany(() => SECINSURANCE, (secinsubranch) => secinsubranch.secinsubranch)
  secinsubranch: SECINSURANCE;

  @OneToMany(
    () => FURNITURE,
    (furniturebranchcode) => furniturebranchcode.furniturebranchcode,
  )
  furniturebranchcode: FURNITURE;

  @OneToMany(
    () => GOLDSILVER,
    (goldsilverbranchcode) => goldsilverbranchcode.goldsilverbranchcode,
  )
  goldsilverbranchcode: GOLDSILVER;

  @OneToMany(
    () => GOVTSECULIC,
    (govtsecbranchcode) => govtsecbranchcode.govtsecbranchcode,
  )
  govtsecbranchcode: GOVTSECULIC;

  @OneToMany(
    () => LANDBUILDING,
    (landbranchcode) => landbranchcode.landbranchcode,
  )
  landbranchcode: LANDBUILDING;

  @OneToMany(
    () => MARKETSHARE,
    (marketbranchcode) => marketbranchcode.marketbranchcode,
  )
  marketbranchcode: MARKETSHARE;

  @OneToMany(
    () => OTHERSECURITY,
    (othersecbranchcode) => othersecbranchcode.othersecbranchcode,
  )
  othersecbranchcode: OTHERSECURITY;

  @OneToMany(
    () => PLANTMACHINARY,
    (plantbranchcode) => plantbranchcode.plantbranchcode,
  )
  plantbranchcode: PLANTMACHINARY;

  @OneToMany(
    () => PLEDGESTOCK,
    (pleadgebranchcode) => pleadgebranchcode.pleadgebranchcode,
  )
  pleadgebranchcode: PLEDGESTOCK;

  @OneToMany(
    () => STOCKSTATEMENT,
    (stockbranchcode) => stockbranchcode.stockbranchcode,
  )
  stockbranchcode: STOCKSTATEMENT;

  @OneToMany(
    () => VEHICLE,
    (vehiclebranchcode) => vehiclebranchcode.vehiclebranchcode,
  )
  vehiclebranchcode: VEHICLE;
}
