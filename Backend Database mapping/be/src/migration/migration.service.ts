// // const oracledb = require('oracledb');
// // import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// // import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, getManager, Connection } from 'typeorm';
// // import *as moment from 'moment'
// import { CITYMASTER } from 'src/entity/city-master.entity';
// import { ACMASTER } from 'src/entity/gl-account-master.entity';
// import { ACCOHEAD } from 'src/entity/gl-statement-code.entity';
// import { ADVOCATEMASTER } from 'src/entity/advocate-master.entity';
// import { AUTHORITYMASTER } from 'src/entity/authority-master.entity';
// import { BANKMASTER } from 'src/entity/bank-master.entity';
// import { BRANCHMASTER } from 'src/entity/clearing-branch-master.entity';
// import { CASTMASTER } from 'src/entity/cast-master.entity';

// import { Injectable, InternalServerErrorException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";

// import { DEPRCATEGORY } from 'src/entity/depriciation-category-master.entity';
// import { DEPRRATE } from 'src/entity/depriciation-rate-master.entity';
// import { DIRECTORMASTER } from 'src/entity/director-master.entity';
// import { HOLIDAYSMASTER } from 'src/entity/holiday.entity';
// import { HEALTHMASTER } from 'src/entity/health-master.entity';
// import { INDUSTRYMASTER } from 'src/entity/industry-master.entity';
// import { INSUARANCEMASTER } from 'src/entity/insurance-master.entity';
// import { INTCATEGORYMASTER } from 'src/entity/interest-category-master.entity';
// import { INTRATESBPG } from 'src/entity/saving-and-pigmy-interest-rates.entity';
// import { ITEMMASTER } from 'src/entity/dead-stock-master.entity';
// import { LOANSTAGEMASTER } from 'src/entity/loan-stage-master.entity';
// import { NARRATIONMASTER } from 'src/entity/narration.entity';
// import { OCCUPATIONMASTER } from 'src/entity/ocuupation-master.entity';
// import { OPERATIONMASTER } from 'src/entity/operation-master.entity';
// import { PGCOMMISSIONMASTER } from 'src/entity/PGCOMMISSIONMASTER.entity';
// import { PRIORITYMASTER } from 'src/entity/PRIORITYMASTER.entity';
// import { PURPOSEMASTER } from 'src/entity/purpose-master.entity';
// import { REPORTTYPEMASTER } from 'src/entity/report-type-master.entity';
// import { SCHEMAST } from 'src/entity/schemeParameters.entity';
// import { IDMASTER } from 'src/entity/customer-id.entity';
// import { CUSTOMERADDRESS } from 'src/entity/customer-address.entity';
// import { SHMASTER } from 'src/entity/share-master.entity';
// import { DPMASTER } from 'src/entity/dpmaster.entity';
// import { LNMASTER } from 'src/entity/term-loan-master.entity';
// import { LNACINTRATE } from 'src/entity/lnacintrate.entity';
// import { GUARANTERDETAILS } from 'src/entity/guarantor.entity';
// import { PGMASTER } from 'src/entity/pgmaster.entity';
// import { ACCOTRAN } from 'src/entity/accotran.entity';
// import { DEPOTRAN } from 'src/entity/depotran.entity';
// import { LOANTRAN } from 'src/entity/loantran.entity';
// import { SHARETRAN } from 'src/entity/sharetran.entity';
// import { PIGMYTRAN } from 'src/entity/pigmytran.entity';
// import { HISTORYTRAN } from 'src/entity/HISTORYTRAN.entity';
// import { DAILYTRAN } from 'src/entity/voucher.entity';
// import { TRANINPUTHEAD } from 'src/entity/transcation-input-gl-head-setting.entity';
// import { HISTORYDIVIDEND } from 'src/entity/shares-dividend.entity';
// import { NOMINEELINK } from 'src/entity/nominee.entity';
// import { ATTERONEYLINK } from 'src/entity/power-of-attorney.entity';
// import { JointAcLink } from 'src/entity/joint-account.entity';
// import { TERMINTRATE } from 'src/entity/rate-for term.entity';
// import { INTRATETD } from 'src/entity/interest-rate-for-term-deposit.entity';
// import { INTRATETDMULTI } from 'src/entity/deposit-intrest-rate.entity';
// import { INTMULTI } from 'src/entity/slab-int.entity';
// import { INTRATELOAN } from 'src/entity/interest-rate-for-loan-and-cc.entity';
// import { LNCCLOAN } from 'src/entity/loan-and-cc.entity';
// import { INTRATEPATSCHEMES } from 'src/entity/pat-scheme-interest-rates.entity';
// import { INTRATE } from 'src/entity/interest-rate.entity';
// import { PREMATULESSRATE } from 'src/entity/premature-pigmy-less-int-rate.entity';
// import { PREMATULESS } from 'src/entity/pigmy-less-int.entity';
// import { SECURITYMASTER } from 'src/entity/security-code.entity';
// import { TDSRATE } from 'src/entity/tds-interest-rate.entity';
// import { SECURITYDETAILS } from 'src/entity/security.entity';
// import { COBORROWER } from 'src/entity/coborrower.entity';
// import { BANKDETAILS } from 'src/entity/BANKDETAILS.entity';
// import { COURTMASTER } from 'src/entity/court-master.entity';
// import { DOCUMENTMASTER } from 'src/entity/document-master.entity';
// import { ITEMCATEGORYMASTER } from 'src/entity/item-category-master.entity';
// import { LOCKERRACKMASTER } from 'src/entity/locker-rack-master.entity';
// import { LOCKERSIZE } from 'src/entity/locker-size-master.entity';
// import { LOCKERMASTER } from 'src/entity/locker-rackwise-master.entity';
// import { BALACATA } from 'src/entity/minimum-balance-master.entity';
// import { OWNBRANCHMASTER } from 'src/entity/own-branch-master.entity';
// import { PREFIX } from 'src/entity/prefix-master.entity';
// import { PRIORITYSECTORMASTER } from 'src/entity/priority-sector-master.entity';
// import { RECOVERYCLEARKMASTER } from 'src/entity/recovery-cleark-master.entity';
// import { RISKCATEGORYMASTER } from 'src/entity/risk-category.entity';
// import { SALARYDIVISIONMASTER } from 'src/entity/salary-division-master.entity';
// import { SUBSALARYMASTER } from 'src/entity/sub-salary-division-master.entity';
// import { WEAKERMASTER } from 'src/entity/weaker-master.entity';
// import { TDSFORMSUBMIT } from 'src/entity/tds-form.entity';
// import { NPAMASTER } from 'src/entity/npa-classification.entity';
// import { NPACLASSIFICATION } from 'src/entity/npa-class.entity';
// import { TDRECEIPTMASTER } from 'src/entity/td-receipt-type.entity';
// import { BOOKDEBTS } from 'src/entity/book-debts.entity';
// import { SECINSURANCE } from 'src/entity/customer-insurance.entity';
// import { FIREPOLICY } from 'src/entity/fire-policy.entity';
// import { FURNITURE } from 'src/entity/furniture-and-fixture.entity';
// import { GOLDSILVER } from 'src/entity/gold-and-silver.entity';
// import { GOVTSECULIC } from 'src/entity/govt-security-and-lic.entity';
// import { LANDBUILDING } from 'src/entity/land-and-buildings.entity';
// import { MARKETSHARE } from 'src/entity/market-shares.entity';
// import { OTHERSECURITY } from 'src/entity/other-security.entity';
// import { OWNDEPOSIT } from 'src/entity/own-deposits.entity';
// import { PLANTMACHINARY } from 'src/entity/plant-and-machinery.entity';
// import { PLEDGESTOCK } from 'src/entity/pleadge-stock.entity';
// import { STOCKSTATEMENT } from 'src/entity/stock-statement.entity';
// import { VEHICLE } from 'src/entity/vehicle.entity';
// import { RENEWALHISTORY } from 'src/entity/RENEWALHISTORY.entity';
// import { SYSPARA } from 'src/entity/system-master-parameters.entity';
// import { DIVPAIDTRAN } from 'src/entity/DIVPAIDTRAN.entity';
// import { INTINSTRUCTION } from 'src/entity/interest-instruction.entity';
// import { TODTRAN } from 'src/entity/over-draft.entity';
// import { SPECIALINSTRUCTION } from 'src/entity/special-instruction.entity';
// import { STANDINSTRUCTION } from 'src/entity/standing-instruction.entity';
// import { INTERESTTRAN } from 'src/entity/INTERESTTRAN.entity'
// import { COMMISSIONSLAB } from 'src/entity/COMMISSIONSLAB.entity';
// import { TEMPJOINTACLINK } from 'src/entity/tempjointaclink.entity'
// import { SIZEWISEBALANCE } from 'src/entity/SIZEWISEBALANCE.entity'
// import { TERMMASTER } from 'src/entity/termmaster.entity'
// import { AGENTCHANGEHISTORY } from 'src/entity/AGENTCHANGEHISTORY.entity'
// import { BANKBRANCHMASTER } from 'src/entity/BANKBRANCHMASTER.entity'
// import { BANKCOMMISSION } from 'src/entity/BANKCOMMISSION.entity'
// import { BANKDEPOTRAN } from 'src/entity/BANKDEPOTRAN.entity'
// import { BATCHVOUCHERTRAN } from 'src/entity/BATCHVOUCHERTRAN.entity'
// import { BUDGETMASTER } from 'src/entity/BUDGETMASTER.entity'
// import { CASHINTINSTRUCTIONS } from 'src/entity/CASHINTINSTRUCTIONS.entity'
// import { CDRATIO } from 'src/entity/CDRATIO.entity'
// import { CHARGES } from 'src/entity/scheme-type-charges.entity'
// import { CHARGESAMT } from 'src/entity/charges.entity'
// import { CHARGESNOTING } from 'src/entity/CHARGESNOTING.entity'
// import { DAILYSHRTRAN } from 'src/entity/DAILYSHRTRAN.entity'
// import { NPALOCK } from 'src/entity/NPALOCK.entity'
// import { EXCESSCASH } from 'src/entity/EXCESSCASH.entity'
// import { CRARTRAN } from 'src/entity/CRARTRAN.entity'
// import { DENOMINATION } from 'src/entity/DENOMINATION.entity'
// import { USERDENOMINATION } from 'src/entity/USERDENOMINATION.entity'
// import { SCHEMDATA } from 'src/entity/SCHEMDATA.entity'
// import { HISTORYDENO } from 'src/entity/HISTORYDENO.entity'
// import { HISTORYGENERALMEETING } from 'src/entity/HISTORYGENERALMEETING.entity'
// import { INTHISTORYTRAN } from 'src/entity/INTHISTORYTRAN.entity'
// import { TDSTRAN } from 'src/entity/TDSTRAN.entity'
// import { OIRTRAN } from 'src/entity/OIRTRAN.entity'
// import { RECOTRAN } from 'src/entity/RECOTRAN.entity'
// import { TDRECEIPTISSUE } from 'src/entity/TDRECEIPTISSUE.entity'
// import { STANDINSTRUCTIONLOG } from 'src/entity/STANDINSTRUCTIONLOG.entity'
// import { NPADATA } from 'src/entity/NPADATA.entity'
// import { INTINSTRUCTIONSLOG } from 'src/entity/INTINSTRUCTIONSLOG.entity'
// import { PASSBOOKPRINT } from 'src/entity/PASSBOOKPRINT.entity'
// import { PASSBOOKHISTORY } from 'src/entity/PASSBOOKHISTORY.entity'
// import { SUBSIDARYMASTER } from 'src/entity/SUBSIDARYMASTER.entity'
// import { MORATORIUMPERIOD } from 'src/entity/moratorium-peroid-master.entity'
// import { DEADSTOCKDETAIL } from 'src/entity/DEADSTOCKDETAIL.entity'
// import { DEADSTOCKHEADER } from 'src/entity/DEADSTOCKHEADER.entity'
// import { SHARECAPITALAMTDETAILS } from 'src/entity/SHARECAPITALANTDETAILS.entity'
// import { GLREPORTLINK } from 'src/entity/GLREPORTLINK.entity'
// import { GLREPORTMASTER } from 'src/entity/GLREPORTMASTER.entity'
// import { LOCKERTRAN } from 'src/entity/LOCKERTRAN.entity'
// import { LOCKERRENTTRAN } from 'src/entity/LOCKERRENTTRAN.entity'
// import { DEPOCLOSETRAN } from 'src/entity/DEPOCLOSETRAN.entity'
// import { DEPOCLOSETRANSAC } from 'src/entity/DEPOCLOSETRANSAC.entity'
// import { MANAGERVIEW } from 'src/entity/manager-view-glp.entity'
// import { DIVIDEND } from 'src/entity/DIVIDEND.entity'
// import { PIGMYCHARTMASTER } from 'src/entity/pigmyChart.entity'
// import { PIGMYCHART } from 'src/entity/pigmy-chart.entity'
// import { CUSTDOCUMENT } from 'src/entity/document.entity'
// import { CATEGORYMASTER } from 'src/entity/category-master.entity';
// import { SMSMAST } from 'src/entity/SMSMAST.entity';
// // import oracledb from 'oracledb';
// // import { createWriteStream } from 'fs';
// // // import mime from 'mime-types';
// // import * as fs from 'fs';
// // // import knex from 'knex';
// // import { SMSMAST } from 'src/entity/SMSMAST.entity';
// // import { dbConfig } from 'src/db.config';
// // import { getSourceConnection } from 'src/db-client.factory';
// // // ---------------------------------------------------ALL DB-----------------------------
// // import * as path from 'path';
// // import { stringify } from 'csv-stringify/sync';
// // import { parse } from 'csv-parse/sync';
// // import { Response, Request } from 'express';
// // // import Perplexity from '@perplexity-ai/perplexity_ai';
// // // import axios from 'axios';
// // // import { GoogleGenerativeAI } from '@google/generative-ai';
// // // import{unidev} from 'unidev';
// // const unidev = require('unidev');
// // // import * as unidev from "unidev";
// // import { CATEGORYMASTER } from 'src/entity/category-master.entity';
// // import {} from '@nestjs/common'

// @Injectable()
// export class MigrateService {
//     constructor(
//         @InjectRepository(JointAcLink) private jointAccountRepository: Repository<JointAcLink>,
//         // @InjectRepository(CATEGORYMASTER) private readonly CATEGORYMASTERService: Repository<CATEGORYMASTER>,
//         // @InjectRepository(CUSTDOCUMENT) private CUSTDOCUMENTService: Repository<CUSTDOCUMENT>,
//         // @InjectRepository(PIGMYCHARTMASTER) private PIGMYCHARTMASTERService: Repository<PIGMYCHARTMASTER>,
//         // @InjectRepository(PIGMYCHART) private PIGMYCHARTService: Repository<PIGMYCHART>,
//         // @InjectRepository(DIVIDEND) private DIVIDENDService: Repository<DIVIDEND>,
//         // @InjectRepository(LOCKERRENTTRAN) private LOCKERRENTTRANService: Repository<LOCKERRENTTRAN>,
//         // @InjectRepository(LOCKERTRAN) private LOCKERTRANService: Repository<LOCKERTRAN>,
//         // @InjectRepository(GLREPORTMASTER) private GLREPORTMASTERService: Repository<GLREPORTMASTER>,
//         // @InjectRepository(GLREPORTLINK) private GLREPORTLINKService: Repository<GLREPORTLINK>,
//         // @InjectRepository(MANAGERVIEW) private MANAGERVIEWService: Repository<MANAGERVIEW>,
//         // @InjectRepository(SHARECAPITALAMTDETAILS) private SHARECAPITALAMTDETAILSService: Repository<SHARECAPITALAMTDETAILS>,
//         // @InjectRepository(DEPOCLOSETRANSAC) private DEPOCLOSETRANSACService: Repository<DEPOCLOSETRANSAC>,
//         // @InjectRepository(DEPOCLOSETRAN) private DEPOCLOSETRANService: Repository<DEPOCLOSETRAN>,
//         // @InjectRepository(DEADSTOCKDETAIL) private DEADSTOCKDETAILService: Repository<DEADSTOCKDETAIL>,
//         // @InjectRepository(DEADSTOCKHEADER) private DEADSTOCKHEADERService: Repository<DEADSTOCKHEADER>,
//         // @InjectRepository(SUBSIDARYMASTER) private SUBSIDARYMASTERService: Repository<SUBSIDARYMASTER>,
//         // @InjectRepository(PASSBOOKHISTORY) private PASSBOOKHISTORYService: Repository<PASSBOOKHISTORY>,
//         // @InjectRepository(MORATORIUMPERIOD) private MORATORIUMPERIODService: Repository<MORATORIUMPERIOD>,
//         // @InjectRepository(PASSBOOKPRINT) private PASSBOOKPRINTService: Repository<PASSBOOKPRINT>,
//         // @InjectRepository(INTINSTRUCTIONSLOG) private INTINSTRUCTIONSLOGService: Repository<INTINSTRUCTIONSLOG>,
//         // @InjectRepository(NPADATA) private NPADATAService: Repository<NPADATA>,
//         // @InjectRepository(STANDINSTRUCTIONLOG) private STANDINSTRUCTIONLOGService: Repository<STANDINSTRUCTIONLOG>,
//         // @InjectRepository(TDRECEIPTISSUE) private TDRECEIPTISSUEService: Repository<TDRECEIPTISSUE>,
//         // @InjectRepository(RECOTRAN) private RECOTRANService: Repository<RECOTRAN>,
//         // @InjectRepository(OIRTRAN) private OIRTRANService: Repository<OIRTRAN>,
//         // @InjectRepository(TDSTRAN) private TDSTRANService: Repository<TDSTRAN>,
//         // @InjectRepository(INTHISTORYTRAN) private INTHISTORYTRANService: Repository<INTHISTORYTRAN>,
//         // @InjectRepository(HISTORYGENERALMEETING) private HISTORYGENERALMEETINGService: Repository<HISTORYGENERALMEETING>,
//         // @InjectRepository(HISTORYDENO) private HISTORYDENOService: Repository<HISTORYDENO>,
//         // @InjectRepository(SCHEMDATA) private SCHEMDATAService: Repository<SCHEMDATA>,
//         // @InjectRepository(USERDENOMINATION) private USERDENOMINATIONService: Repository<USERDENOMINATION>,
//         // @InjectRepository(DENOMINATION) private DENOMINATIONService: Repository<DENOMINATION>,
//         // @InjectRepository(CRARTRAN) private CRARTRANService: Repository<CRARTRAN>,
//         // @InjectRepository(EXCESSCASH) private EXCESSCASHService: Repository<EXCESSCASH>,
//         // @InjectRepository(NPALOCK) private NPALOCKService: Repository<NPALOCK>,
//         // @InjectRepository(CDRATIO) private CDRATIOService: Repository<CDRATIO>,
//         // @InjectRepository(DAILYSHRTRAN) private DAILYSHRTRANService: Repository<DAILYSHRTRAN>,
//         // @InjectRepository(CHARGESNOTING) private CHARGESNOTINGService: Repository<CHARGESNOTING>,
//         // @InjectRepository(CHARGES) private CHARGESService: Repository<CHARGES>,
//         // @InjectRepository(CHARGESAMT) private CHARGESAMTService: Repository<CHARGESAMT>,
//         // @InjectRepository(CASHINTINSTRUCTIONS) private CASHINTINSTRUCTIONSService: Repository<CASHINTINSTRUCTIONS>,
//         // @InjectRepository(BANKBRANCHMASTER) private BANKBRANCHMASTERService: Repository<BANKBRANCHMASTER>,
//         // @InjectRepository(BANKDEPOTRAN) private BANKDEPOTRANService: Repository<BANKDEPOTRAN>,
//         // @InjectRepository(BATCHVOUCHERTRAN) private BATCHVOUCHERTRANService: Repository<BATCHVOUCHERTRAN>,
//         // @InjectRepository(BUDGETMASTER) private BUDGETMASTERService: Repository<BUDGETMASTER>,
//         // @InjectRepository(BANKCOMMISSION) private BANKCOMMISSIONService: Repository<BANKCOMMISSION>,
//         // @InjectRepository(PRIORITYSECTORMASTER) private PRIORITYSECTORMASTERService: Repository<PRIORITYSECTORMASTER>,
//         // @InjectRepository(RECOVERYCLEARKMASTER) private RECOVERYCLEARKMASTERService: Repository<RECOVERYCLEARKMASTER>,
//         // @InjectRepository(RISKCATEGORYMASTER) private RISKCATEGORYMASTERService: Repository<RISKCATEGORYMASTER>,
//         // @InjectRepository(SALARYDIVISIONMASTER) private SALARYDIVISIONMASTERService: Repository<SALARYDIVISIONMASTER>,
//         // @InjectRepository(SPECIALINSTRUCTION) private SPECIALINSTRUCTIONService: Repository<SPECIALINSTRUCTION>,
//         // @InjectRepository(STANDINSTRUCTION) private STANDINSTRUCTIONService: Repository<STANDINSTRUCTION>,
//         // @InjectRepository(TODTRAN) private TODTRANService: Repository<TODTRAN>,
//         // @InjectRepository(INTINSTRUCTION) private INTINSTRUCTIONService: Repository<INTINSTRUCTION>,
//         // @InjectRepository(DIVPAIDTRAN) private DIVPAIDTRANService: Repository<DIVPAIDTRAN>,
//         // @InjectRepository(SYSPARA) private SYSPARAService: Repository<SYSPARA>,
//         // @InjectRepository(INTERESTTRAN) private INTERESTTRANService: Repository<INTERESTTRAN>,
//         // @InjectRepository(RENEWALHISTORY) private RENEWALHISTORYService: Repository<RENEWALHISTORY>,
//         // @InjectRepository(VEHICLE) private VEHICLEService: Repository<VEHICLE>,
//         // @InjectRepository(STOCKSTATEMENT) private STOCKSTATEMENTService: Repository<STOCKSTATEMENT>,
//         // @InjectRepository(PLEDGESTOCK) private PLEDGESTOCKService: Repository<PLEDGESTOCK>,
//         // @InjectRepository(PLANTMACHINARY) private PLANTMACHINARYService: Repository<PLANTMACHINARY>,
//         // @InjectRepository(OWNDEPOSIT) private OWNDEPOSITService: Repository<OWNDEPOSIT>,
//         // @InjectRepository(OTHERSECURITY) private OTHERSECURITYService: Repository<OTHERSECURITY>,
//         // @InjectRepository(MARKETSHARE) private MARKETSHAREService: Repository<MARKETSHARE>,
//         // @InjectRepository(LANDBUILDING) private LANDBUILDINGService: Repository<LANDBUILDING>,
//         // @InjectRepository(GOVTSECULIC) private GOVTSECULICService: Repository<GOVTSECULIC>,
//         // @InjectRepository(FURNITURE) private FURNITUREService: Repository<FURNITURE>,
//         // @InjectRepository(GOLDSILVER) private GOLDSILVERService: Repository<GOLDSILVER>,
//         // @InjectRepository(FIREPOLICY) private FIREPOLICYService: Repository<FIREPOLICY>,
//         // @InjectRepository(BOOKDEBTS) private BOOKDEBTSService: Repository<BOOKDEBTS>,
//         // @InjectRepository(SUBSALARYMASTER) private SUBSALARYMASTERService: Repository<SUBSALARYMASTER>,
//         // @InjectRepository(TDRECEIPTMASTER) private TDRECEIPTMASTERService: Repository<TDRECEIPTMASTER>,
//         // @InjectRepository(TDSFORMSUBMIT) private TDSFORMSUBMITService: Repository<TDSFORMSUBMIT>,
//         // @InjectRepository(WEAKERMASTER) private WEAKERMASTERService: Repository<WEAKERMASTER>,
//         // @InjectRepository(SECINSURANCE) private SECINSURANCEService: Repository<SECINSURANCE>,
//         // @InjectRepository(NPAMASTER) private NPAMASTERService: Repository<NPAMASTER>,
//         // @InjectRepository(NPACLASSIFICATION) private NPACLASSIFICATIONService: Repository<NPACLASSIFICATION>,
//         // @InjectRepository(PREFIX) private PREFIXService: Repository<PREFIX>,
//         // @InjectRepository(OWNBRANCHMASTER) private OWNBRANCHMASTERService: Repository<OWNBRANCHMASTER>,
//         // @InjectRepository(BALACATA) private BALACATAService: Repository<BALACATA>,
//         // @InjectRepository(LOCKERMASTER) private LOCKERMASTERService: Repository<LOCKERMASTER>,
//         // @InjectRepository(LOCKERSIZE) private LOCKERSIZEService: Repository<LOCKERSIZE>,
//         // @InjectRepository(LOCKERRACKMASTER) private LOCKERRACKMASTERService: Repository<LOCKERRACKMASTER>,
//         // @InjectRepository(DOCUMENTMASTER) private DOCUMENTMASTERService: Repository<DOCUMENTMASTER>,
//         // @InjectRepository(ITEMCATEGORYMASTER) private ITEMCATEGORYMASTERService: Repository<ITEMCATEGORYMASTER>,
//         // @InjectRepository(COURTMASTER) private COURTMASTERService: Repository<COURTMASTER>,
//         // @InjectRepository(BRANCHMASTER) private BRANCHMASTERService: Repository<BRANCHMASTER>,
//         // @InjectRepository(CASTMASTER) private CASTMASTERService: Repository<CASTMASTER>,
//         // @InjectRepository(BANKDETAILS) private BANKDETAILSService: Repository<BANKDETAILS>,
//         // @InjectRepository(BANKMASTER) private BANKMASTERService: Repository<BANKMASTER>,
//         // @InjectRepository(ADVOCATEMASTER) private ADVOCATEMASTERService: Repository<ADVOCATEMASTER>,
//         // @InjectRepository(AUTHORITYMASTER) private AUTHORITYMASTERService: Repository<AUTHORITYMASTER>,
//         // @InjectRepository(COBORROWER) private COBORROWERService: Repository<COBORROWER>,
//         // @InjectRepository(SECURITYDETAILS) private SECURITYDETAILSService: Repository<SECURITYDETAILS>,
//         // @InjectRepository(TDSRATE) private TDSRATEService: Repository<TDSRATE>,
//         // @InjectRepository(SECURITYMASTER) private SECURITYMASTERService: Repository<SECURITYMASTER>,
//         // @InjectRepository(PREMATULESS) private PREMATULESSService: Repository<PREMATULESS>,
//         // @InjectRepository(PREMATULESSRATE) private PREMATULESSRATEService: Repository<PREMATULESSRATE>,
//         // @InjectRepository(INTRATE) private INTRATEService: Repository<INTRATE>,
//         // @InjectRepository(INTRATEPATSCHEMES) private INTRATEPATSCHEMESService: Repository<INTRATEPATSCHEMES>,
//         // @InjectRepository(LNCCLOAN) private LNCCLOANService: Repository<LNCCLOAN>,
//         // @InjectRepository(INTRATELOAN) private INTRATELOANService: Repository<INTRATELOAN>,
//         // @InjectRepository(INTRATETDMULTI) private INTRATETDMULTIService: Repository<INTRATETDMULTI>,
//         // @InjectRepository(INTMULTI) private INTMULTIService: Repository<INTMULTI>,
//         // @InjectRepository(CITYMASTER) private citymasterService: Repository<CITYMASTER>,
//         // @InjectRepository(NOMINEELINK) private nomineeService: Repository<NOMINEELINK>,
//         // @InjectRepository(TERMINTRATE) private intRateTDGridRepository: Repository<TERMINTRATE>,
//         // @InjectRepository(INTRATETD) private intRateTDRepository: Repository<INTRATETD>,

//         // @InjectRepository(ATTERONEYLINK) private atteroneyService: Repository<ATTERONEYLINK>,
//         // @InjectRepository(DEPRCATEGORY) private DEPRCATEGORYService: Repository<DEPRCATEGORY>,
//         // @InjectRepository(DEPRRATE) private DEPRRATEService: Repository<DEPRRATE>,
//         // @InjectRepository(DIRECTORMASTER) private DIRECTORMASTERService: Repository<DIRECTORMASTER>,
//         // @InjectRepository(HEALTHMASTER) private HEALTHMASTERService: Repository<HEALTHMASTER>,
//         // @InjectRepository(HOLIDAYSMASTER) private HOLIDAYSMASTERService: Repository<HOLIDAYSMASTER>,
//         // @InjectRepository(INDUSTRYMASTER) private INDUSTRYMASTERService: Repository<INDUSTRYMASTER>,
//         // @InjectRepository(INSUARANCEMASTER) private INSUARANCEMASTERService: Repository<INSUARANCEMASTER>,
//         // @InjectRepository(INTCATEGORYMASTER) private INTCATEGORYMASTERService: Repository<INTCATEGORYMASTER>,
//         // @InjectRepository(INTRATESBPG) private INTRATESBPGService: Repository<INTRATESBPG>,
//         // @InjectRepository(ITEMMASTER) private ITEMMASTERService: Repository<ITEMMASTER>,
//         // @InjectRepository(LOANSTAGEMASTER) private LOANSTAGEMASTERService: Repository<LOANSTAGEMASTER>,
//         // @InjectRepository(NARRATIONMASTER) private NARRATIONMASTERService: Repository<NARRATIONMASTER>,
//         // @InjectRepository(OCCUPATIONMASTER) private OCCUPATIONMASTERService: Repository<OCCUPATIONMASTER>,
//         // @InjectRepository(OPERATIONMASTER) private OPERATIONMASTERService: Repository<OPERATIONMASTER>,
//         // @InjectRepository(PGCOMMISSIONMASTER) private PGCOMMISSIONMASTERService: Repository<PGCOMMISSIONMASTER>,
//         // @InjectRepository(PRIORITYMASTER) private PRIORITYMASTERService: Repository<PRIORITYMASTER>,
//         // @InjectRepository(PURPOSEMASTER) private PURPOSEMASTERService: Repository<PURPOSEMASTER>,
//         // @InjectRepository(REPORTTYPEMASTER) private REPORTTYPEMASTERService: Repository<REPORTTYPEMASTER>,
//         // @InjectRepository(SCHEMAST) private SCHEMASTService: Repository<SCHEMAST>,
//         // @InjectRepository(IDMASTER) private IDMASTERService: Repository<IDMASTER>,
//         // @InjectRepository(CUSTOMERADDRESS) private CUSTOMERADDRESSService: Repository<CUSTOMERADDRESS>,
//         // @InjectRepository(SHMASTER) private SHMASTERService: Repository<SHMASTER>,
//         // @InjectRepository(DPMASTER) private DPMASTERService: Repository<DPMASTER>,
//         // @InjectRepository(LNMASTER) private LNMASTERService: Repository<LNMASTER>,
//         // @InjectRepository(LNACINTRATE) private LNACINTRATEService: Repository<LNACINTRATE>,
//         // @InjectRepository(GUARANTERDETAILS) private GUARANTERDETAILSService: Repository<GUARANTERDETAILS>,
//         // @InjectRepository(PGMASTER) private PGMASTERService: Repository<PGMASTER>,
//         // @InjectRepository(ACCOTRAN) private ACCOTRANService: Repository<ACCOTRAN>,
//         // @InjectRepository(DEPOTRAN) private DEPOTRANService: Repository<DEPOTRAN>,
//         // @InjectRepository(LOANTRAN) private LOANTRANService: Repository<LOANTRAN>,
//         // @InjectRepository(SHARETRAN) private SHARETRANService: Repository<SHARETRAN>,
//         // @InjectRepository(PIGMYTRAN) private PIGMYTRANService: Repository<PIGMYTRAN>,
//         // @InjectRepository(HISTORYTRAN) private HISTORYTRANService: Repository<HISTORYTRAN>,
//         // @InjectRepository(DAILYTRAN) private DAILYTRANService: Repository<DAILYTRAN>,
//         // @InjectRepository(ACMASTER) private ACMASTERService: Repository<ACMASTER>,
//         // @InjectRepository(TRANINPUTHEAD) private TRANINPUTHEADService: Repository<TRANINPUTHEAD>,
//         // @InjectRepository(COMMISSIONSLAB) private COMMISSIONSLABService: Repository<COMMISSIONSLAB>,
//         // @InjectRepository(TEMPJOINTACLINK) private TEMPJOINTACLINKService: Repository<TEMPJOINTACLINK>,
//         // @InjectRepository(SIZEWISEBALANCE) private SIZEWISEBALANCEService: Repository<SIZEWISEBALANCE>,
//         // @InjectRepository(TERMMASTER) private TERMMASTERService: Repository<TERMMASTER>,
//         // @InjectRepository(HISTORYDIVIDEND) private HISTORYDIVIDENDService: Repository<HISTORYDIVIDEND>,
//         // @InjectRepository(AGENTCHANGEHISTORY) private AGENTCHANGEHISTORYService: Repository<AGENTCHANGEHISTORY>,
//         // @InjectRepository(SMSMAST) private SmsService: Repository<SMSMAST>,
//         private connection: Connection
//     ) {
//         // this.genAI = new GoogleGenerativeAI(this.API_KEY); 
//     }



//     async getAllTableNames() {
//         try {

//             let result = await this.jointAccountRepository.query(`
//                             SELECT table_name
//                             FROM information_schema.tables
//                             WHERE table_schema = 'public'
//                             AND table_type = 'BASE TABLE';
//                 `)

//             let tablearray: string[] = [];
//             for (let table of result) {
//                 tablearray.push(table.table_name)
//             }

//             return tablearray;
//         } catch (error) {
//             throw new InternalServerErrorException();
//         }
//     }


//     async getAllColumnsNames(tableName) {
//         try {
//             let result = await this.jointAccountRepository.query(`
//                             SELECT column_name
//                             FROM information_schema.columns
//                             WHERE table_name = '${tableName}';
//                 `)
//             let columnArray: string[] = [];
//             for (let column of result) {
//                 columnArray.push(column.column_name)
//             }

//             return columnArray;

//             return result
//         } catch (error) {
//             throw new InternalServerErrorException();
//         }
//     }








// }


import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class MigrateService {
    // constructor(
    //     @InjectRepository(JointAcLink)
    //     private readonly jointAccountRepository: Repository<JointAcLink>,
    //     private readonly dataSource: DataSource,
    // ) { }


    constructor(
        @InjectDataSource('primaryConnection') private primaryDb: DataSource,
        @InjectDataSource('clientConnection') private clientDb: DataSource,
    ) { }

    async getPrimaryData() {
        return await this.primaryDb.query('SELECT * FROM idmaster');
    }

    async getClientData() {
        return await this.clientDb.query('SELECT * FROM LNMASTER');
    }



    // async getAllTableNames() {
    //     try {
    //         const result = await this.jointAccountRepository.query(`
    //     SELECT table_name
    //     FROM information_schema.tables
    //     WHERE table_schema = 'public'
    //     AND table_type = 'BASE TABLE';
    //   `);
    //         const tableArray: string[] = result.map((table: any) => table.table_name);
    //         console.log('✅ Successfully fetched all table names');
    //         return tableArray;
    //     } catch (error) {
    //         console.error(' Failed to fetch table names:', error);
    //         throw new InternalServerErrorException(error.message);
    //     }
    // }

    // async getAllColumnsNames(tableName: string) {
    //     try {
    //         const result = await this.jointAccountRepository.query(`
    //     SELECT column_name
    //     FROM information_schema.columns
    //     WHERE table_name = '${tableName}';
    //   `);
    //         const columnArray: string[] = result.map((col: any) => col.column_name);
    //         console.log(` Successfully fetched columns for table: ${tableName}`);
    //         return columnArray;
    //     } catch (error) {
    //         console.error(` Failed to fetch column names for ${tableName}:`, error);
    //         throw new InternalServerErrorException(error.message);
    //     }
    // }
}
