import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DPMASTER } from './dpmaster.entity';
//import { DEPOCLOSETRANSAC } from './DEPOCLOSETRANSAC.entity';
import { LNMASTER } from './term-loan-master.entity';
import { SHMASTER } from './share-master.entity';
//import { RENEWALHISTORY } from './RENEWALHISTORY.entity';
//import { PIGMYCHART } from './pigmy-chart.entity';
//import { HISTORYTRAN } from './HISTORYTRAN.entity';
///mport { ACDOCUMENTDETAILS } from './ACDOCUMENTDETAILS.entity';
//import { AGENTCHANGEHISTORY } from './AGENTCHANGEHISTORY.entity';

//import { CHEQUEBOOKISSUED } from './CHEQUEBOOKISSUED.entity';
//import { SPECIALINSTRUCTION } from './special-instruction.entity';
//import { INTINSTRUCTION } from './interest-instruction.entity';
//import { STANDINSTRUCTION } from './standing-instruction.entity';
//import { COMPANYGROUPMASTER } from './company-group-master.entity';


// import { INTRATETD } from './interest-rate-for-term-deposit.entity';
// import { INTRATEPATSCHEMES } from './pat-scheme-interest-rates.entity';
// import { INTRATESBPG } from './saving-and-pigmy-interest-rates.entity';
// import { INTRATELOAN } from './interest-rate-for-loan-and-cc.entity';
// import { INTRATETDMULTI } from './deposit-intrest-rate.entity';
// import { PREMATULESSRATE } from './premature-pigmy-less-int-rate.entity';
// import { MORATORIUMPERIOD } from './moratorium-peroid-master.entity';
// import { CHARGESNOTING } from './CHARGESNOTING.entity';
// import { BOOKDEBTS } from './book-debts.entity';

//import { ACMASTER } from './gl-account-master.entity';
//import { OWNDEPOSIT } from './own-deposits.entity';
//import { DEPOCLOSETRAN } from './DEPOCLOSETRAN.entity';


// import { FIREPOLICY } from './fire-policy.entity';
// import { PLANTMACHINARY } from './plant-and-machinery.entity';
// import { MARKETSHARE } from './market-shares.entity';
// import { FURNITURE } from './furniture-and-fixture.entity';
// import { VEHICLE } from './vehicle.entity';
// import { PLEDGESTOCK } from './pleadge-stock.entity';
// import { STOCKSTATEMENT } from './stock-statement.entity';
// import { LANDBUILDING } from './land-and-buildings.entity';

// import { OTHERSECURITY } from './other-security.entity';
// import { GOVTSECULIC } from './govt-security-and-lic.entity';
// import { GOLDSILVER } from './gold-and-silver.entity';
// import { SECINSURANCE } from './customer-insurance.entity';
// import { DAILYTRAN } from './voucher.entity';

@Entity()
export class SCHEMAST {
  @PrimaryGeneratedColumn()
  id: number;

  /* ============================
     DPMASTER RELATIONS (FIXED)
     ============================ */

  // AC_TYPE → DPMASTER
  @OneToMany(() => DPMASTER, (dp) => dp.DPMasterScheme)
  DPschemecode: DPMASTER[];

  // PIGMY_ACTYPE → DPMASTER
  @OneToMany(() => DPMASTER, (dp) => dp.PGDPMaster)
  PGDPMaster: DPMASTER[];

  /* ============================
     EXISTING RELATIONS (UNCHANGED)
     ============================ */



  // @OneToMany(() => DEPOCLOSETRANSAC, d => d.depoCloseTranAc)
  // depoCloseTranAc: DEPOCLOSETRANSAC[];

  @OneToMany(() => LNMASTER, l => l.LNCCMaster)
  lncccode: LNMASTER[];

  @OneToMany(() => SHMASTER, s => s.shareMaster)
  shareCode: SHMASTER[];

  // @OneToMany(() => RENEWALHISTORY, r => r.renewalHistory)
  // renewalHistory: RENEWALHISTORY[];

  // @OneToMany(() => PIGMYCHART, p => p.scheme)
  // pigmyChart: PIGMYCHART[];

  // @OneToMany(() => HISTORYTRAN, h => h.HistoryTran)
  // historyTran: HISTORYTRAN[];

  // @OneToMany(() => HISTORYTRAN, h => h.HistoryTranType)
  // historyTranType: HISTORYTRAN[];

  // @OneToMany(() => ACDOCUMENTDETAILS, a => a.acDocument)
  // acDocumentDetails: ACDOCUMENTDETAILS[];

  // @OneToMany(() => AGENTCHANGEHISTORY, a => a.agentChange)
  // agentChange: AGENTCHANGEHISTORY[];

  // @OneToMany(() => AGENTCHANGEHISTORY, a => a.agentACChange)
  // agentACChange: AGENTCHANGEHISTORY[];

  // @OneToMany(() => CHEQUEBOOKISSUED, c => c.chequeBook)
  // chequeBook: CHEQUEBOOKISSUED[];

  // @OneToMany(() => SPECIALINSTRUCTION, s => s.specialIns)
  // specialIns: SPECIALINSTRUCTION[];

  // @OneToMany(() => INTINSTRUCTION, i => i.interestDr)
  // interestDr: INTINSTRUCTION[];

  // @OneToMany(() => INTINSTRUCTION, i => i.interestCr)
  // interestCr: INTINSTRUCTION[];

  // @OneToMany(() => STANDINSTRUCTION, s => s.standingInsDr)
  // standingInsDr: STANDINSTRUCTION[];

  // @OneToMany(() => STANDINSTRUCTION, s => s.standingInsCr)
  // standingInsCr: STANDINSTRUCTION[];

  // @OneToMany(() => COMPANYGROUPMASTER, c => c.company)
  // scheme: COMPANYGROUPMASTER[];

  // @OneToMany(() => INTRATETD, i => i.scheme)
  // irftd: INTRATETD[];

  // @OneToMany(() => INTRATEPATSCHEMES, p => p.scheme)
  // patscheme: INTRATEPATSCHEMES[];

  // @OneToMany(() => INTRATESBPG, i => i.scheme)
  // sapint: INTRATESBPG[];

  // @OneToMany(() => INTRATELOAN, i => i.scheme)
  // intloancc: INTRATELOAN[];

  // @OneToMany(() => INTRATETDMULTI, d => d.scheme)
  // depoint: INTRATETDMULTI[];

  // @OneToMany(() => PREMATULESSRATE, p => p.scheme)
  // prepigmy: PREMATULESSRATE[];

  // @OneToMany(() => MORATORIUMPERIOD, m => m.moratoriumScheme)
  // moratoriumScheme: MORATORIUMPERIOD[];

  // @OneToMany(() => CHARGESNOTING, c => c.chargesScheme)
  // chargesScheme: CHARGESNOTING[];

  // @OneToMany(() => BOOKDEBTS, b => b.scheme)
  // bookdebts: BOOKDEBTS[];

//   @OneToMany(() => DEPOCLOSETRAN, d => d.schema)
// depocloseTran: DEPOCLOSETRAN[];

// @OneToMany(() => DEPOCLOSETRANSAC, d => d.schema)
// depoCloseTransactions: DEPOCLOSETRANSAC[];



//   @OneToMany(() => OWNDEPOSIT, o => o.actypeowndepo)
// actypeowndepo: OWNDEPOSIT[];

//   @OneToMany(() => FIREPOLICY, f => f.fireactype)
//   fireactype: FIREPOLICY[];

//   @OneToMany(() => PLANTMACHINARY, p => p.plantmachinary)
//   plantmachinary: PLANTMACHINARY[];

//   @OneToMany(() => MARKETSHARE, m => m.marketshare)
//   marketshare: MARKETSHARE[];

//   @OneToMany(() => FURNITURE, f => f.furniture)
//   furniture: FURNITURE[];

//   @OneToMany(() => VEHICLE, v => v.vehicle)
//   vehicle: VEHICLE[];

//   @OneToMany(() => PLEDGESTOCK, p => p.pledge)
//   pledge: PLEDGESTOCK[];

//   @OneToMany(() => STOCKSTATEMENT, s => s.stockstatement)
//   stockstatement: STOCKSTATEMENT[];

//   @OneToMany(() => LANDBUILDING, l => l.land)
//   land: LANDBUILDING[];

//   @OneToMany(() => OTHERSECURITY, o => o.othersec)
//   othersec: OTHERSECURITY[];

//   @OneToMany(() => GOVTSECULIC, g => g.govsec)
//   govsec: GOVTSECULIC[];

//   @OneToMany(() => GOLDSILVER, g => g.goldsilver)
//   goldsilver: GOLDSILVER[];

//   @OneToMany(() => SECINSURANCE, s => s.custinsurace)
//   custinsurace: SECINSURANCE[];

//   @OneToMany(() => DAILYTRAN, d => d.dailytranschemes)
//   dailytranscheme: DAILYTRAN[];

//   @OneToMany(() => OWNDEPOSIT, o => o.depoactype)
// depoactype: OWNDEPOSIT[];

}
