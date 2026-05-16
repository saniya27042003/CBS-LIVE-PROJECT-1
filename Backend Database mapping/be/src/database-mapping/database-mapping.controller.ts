import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DatabaseMappingService } from './database-mapping.service';
import { DatabaseService } from '../database/database.service';

@Controller('database-mapping')
export class DatabaseMappingController {

  constructor(
    private readonly db: DatabaseMappingService,
    private readonly dbService: DatabaseService
  ) { }

  // ---------------- CONNECTION ENDPOINTS ----------------

  @Post('connect-server')
  async connectServer(@Body() config: any) {
    return this.db.connectServer(config);
  }

  @Post('connect-client')
  async connectClient(@Body() config: any) {
    return this.db.connectClient(config);
  }

  // ---------------- METADATA DISCOVERY (FOR DROPDOWNS) ----------------

  @Post('server/databases')
  async getServerDatabases(@Body() config: any) {
    return this.db.getServerDatabases(config);
  }

  @Get('server/tables')
  async getServerTables() {
    return this.db.getPrimaryTableNames();
  }

  @Get('server/columns/:tableName')
  async getServerColumns(@Param('tableName') tableName: string) {
    // Change this to call your Service method
    return await this.db.getAllColumnsNames(tableName);
  }

  @Get('client/tables')
  getClientTables() {
    return this.db.getClientTableNames();
  }

  @Get('client/columns/:tableName')
  async getClientColumns(@Param('tableName') tableName: string) {
    // Change this to call your Service method
    return await this.db.getClientColumns(tableName);
  }

  // ---------------- CORE BANKING MIGRATION ENDPOINTS ----------------

  //table1
  @Post('migrate/syspara')
  async migrateSYSPARA() {
    return this.db.migrateSYSPARA();
  }

  //table2
  @Post('migrate/schemast')
  async migrateSCHEMAST() {
    return this.db.migrateSCHEMAST();
  }

  //table3
  @Post('migrate/acmaster')
  async migrateACMASTER() {
    return this.db.migrateACMASTER();
  }

  //table4
  @Post('migrate/idmaster')
  async migrateIDMASTER() {
    return this.db.migrateIDMASTER();
  }

  //table5
  @Post('migrate/dpmaster')
  async migrateDPWithLinks() {
    return this.db.migrateDPWithLinks();
  }


  //table6
  @Post('migrate/lnmaster')
  async migrateLNMASTERWithChild() {
    return this.db.migrateLNMASTERWithChild();
  }

  //table7
  @Post('migrate/shmaster')
  async migrateSHMASTERWithChild() {
    return this.db.migrateSHMASTERWithChild();
  }

  //table8
  @Post('migrate/pgmaster')
  async migratePGMASTERWithChildren() {
    return this.db.migratePGMASTERWithChildren();
  }

  // ---------------- SUPPLEMENTARY & MASTER TABLES ----------------

  //table9 
  @Post('migrate/branchmaster')
  async migrateBRANCHMASTER() {
    return await this.db.migrateBRANCHMASTER();
  }

  //table10
  @Post('migrate/castmaster')
  async migrateCASTMASTER() {
    return this.db.migrateCASTMASTER();
  }

  //table11
  // @Post('migrate/guaranterdetails')
  // async migrateGUARANTERDETAILS() {
  //   return this.db.migrateGUARANTERDETAILS();
  // }

  //table12
  @Post('migrate/termmaster')
  async migrateTERMMASTER() {
    return this.db.migrateTERMMASTER();
  }

  //table13
  @Post('migrate/sizewisebalance')
  async migrateSIZEWISEBALANCE() {
    return this.db.migrateSIZEWISEBALANCE();
  }

  //table14
  @Post('migrate/advocatemaster')
  async migrateADVOCATEMASTER() {
    return this.db.migrateADVOCATEMASTER();
  }

  //table15
  @Post('migrate/balacata')
  async migrateBALACATA() {
    return this.db.migrateBALACATA();
  }

  //table16
  @Post('migrate/prefix')
  async migratePREFIX() {
    return this.db.migratePREFIX();
  }

  //table17
  @Post('migrate/prioritysectormaster')
  async migratePRIORITYSECTORMASTER() {
    return this.db.migratePRIORITYSECTORMASTER();
  }

  //table18
  @Post('migrate/recoveryclearkmaster')
  async migrateRECOVERYCLEARKMASTER() {
    return this.db.migrateRECOVERYCLEARKMASTER();
  }

  //table19
  @Post('migrate/salarydevisionmaster')
  async migrateSALARYDIVISIONMASTER() {
    return this.db.migrateSALARYDIVISIONMASTER();
  }

  //table20
  @Post('migrate/subsalarymaster')
  async migrateSUBSALARYMASTER() {
    return this.db.migrateSUBSALARYMASTER();
  }

  //table21
  @Post('migrate/weakermaster')
  async migrateWEAKERMASTER() {
    return this.db.migrateWEAKERMASTER();
  }

  //table22
  @Post('migrate/tdreceiptmaster')
  async migrateTDRECEIPTMASTER() {
    return this.db.migrateTDRECEIPTMASTER();
  }

  //table23
  @Post('migrate/authoritymaster')
  async migrateAUTHORITYMASTER() {
    return this.db.migrateAUTHORITYMASTER();
  }

  //table24
  @Post('migrate/lockerrackmaster')
  async migrateLOCKERRACKMASTER() {
    return this.db.migrateLOCKERRACKMASTER();
  }

  //table25
  @Post('migrate/lockersize')
  async migrateLOCKERSIZE() {
    return this.db.migrateLOCKERSIZE();
  }

  //table26
  @Post('migrate/lockermaster')
  async migrateLOCKERMASTER() {
    return this.db.migrateLOCKERMASTER();
  }

  //table27
  @Post('migrate/ownbranchmaster')
  async migrateOWNBRANCHMASTER() {
    return this.db.migrateOWNBRANCHMASTER();
  }

  //table28
  @Post('migrate/ITEMCATEGORYMASTER')
  async migrateITEMCATEGORYMASTER() {
    return this.db.migrateITEMCATEGORYMASTER();
  }

  //table29
  @Post('migrate/documentmaster')
  async migrateDOCUMENTMASTER() {
    return this.db.migrateDOCUMENTMASTER();
  }

  //table30
  @Post('migrate/courtmaster')
  async migrateCOURTMASTER() {
    return this.db.migrateCOURTMASTER();
  }

  //table31
  @Post('migrate/categorymaster')
  async migrateCATEGORYMASTER() {
    return this.db.migrateCATEGORYMASTER();
  }

  //table32
  @Post('migrate/bankdetails')
  async migrateBANKDETAILS() {
    return this.db.migrateBANKDETAILS();
  }

  //table33
  @Post('migrate/citymaster')
  async migrateCITYMASTER() {
    return this.db.migrateCITYMASTER();
  }

  //table34
  @Post('migrate/bankmaster')
  async migrateBANKMASTER() {
    return this.db.migrateBANKMASTER();
  }

  //table35
  @Post('migrate/deprcategory')
  async migrateDEPRCATEGORY() {
    return await this.db.migrateDEPRCATEGORY();
  }

  //table36
  @Post('migrate/directormaster')
  async migrateDIRECTORMASTER() {
    return await this.db.migrateDIRECTORMASTER();
  }

  //table37
  @Post('migrate/healthmaster')
  async migrateHEALTHMASTER() {
    return await this.db.migrateHEALTHMASTER();
  }

  //table38
  @Post('migrate/industrymaster')
  async migrateINDUSTRYMASTER() {
    return await this.db.migrateINDUSTRYMASTER();
  }

  //table39
  @Post('migrate/insurancemaster')
  async migrateINSUARANCEMASTER() {
    return await this.db.migrateINSUARANCEMASTER();
  }

  //table40
  @Post('migrate/intcategorymaster')
  async migrateINTCATEGORYMASTER() {
    return await this.db.migrateINTCATEGORYMASTER();
  }

  //table41
  @Post('migrate/itemmaster')
  async migrateITEMMASTER() {
    return await this.db.migrateITEMMASTER();
  }

  //table42
  @Post('migrate/loanstagemaster')
  async migrateLOANSTAGEMASTER() {
    return await this.db.migrateLOANSTAGEMASTER();
  }

  //table43
  @Post('migrate/narrationmaster')
  async migrateNARRATIONMASTER() {
    return await this.db.migrateNARRATIONMASTER();
  }

  //table44
  @Post('migrate/occupationmaster')
  async migrateOCCUPATIONMASTER() {
    return await this.db.migrateOCCUPATIONMASTER();
  }

  //table45
  @Post('migrate/operationmaster')
  async migrateOPERATIONMASTER() {
    return await this.db.migrateOPERATIONMASTER();
  }

  //table46
  @Post('migrate/prioritymaster')
  async migratePRIORITYMASTER() {
    return await this.db.migratePRIORITYMASTER();
  }

  //table47
  @Post('migrate/purposemaster')
  async migratePURPOSEMASTER() {
    return await this.db.migratePURPOSEMASTER();
  }

  //table48
  @Post('migrate/reporttypemaster')
  async migrateREPORTTYPEMASTER() {
    return await this.db.migrateREPORTTYPEMASTER();
  }

  //table49
  @Post('migrate/holidaysmaster')
  async migrateHOLIDAYSMASTER() {
    return await this.db.migrateHOLIDAYSMASTER();
  }

  //table50
  @Post('migrate/traninputhead')
  async migrateTRANINPUTHEAD() {
    return await this.db.migrateTRANINPUTHEAD();
  }

  //table51
  @Post('migrate/pgcommissionmaster')
  async migratePGCOMMISSIONMASTER() {
    return await this.db.migratePGCOMMISSIONMASTER();
  }

  //table52
  @Post('migrate/stockstatement')
  async migrateSTOCKSTATEMENT() {
    return await this.db.migrateSTOCKSTATEMENT();
  }

  //table53
  @Post('migrate/vehicle')
  async migrateVEHICLE() {
    return await this.db.migrateVEHICLE();
  }

  //table54
  @Post('migrate/pledgestock')
  async migratePLEDGESTOCK() {
    return await this.db.migratePLEDGESTOCK();
  }

  //table55
  @Post('migrate/plantmachinary')
  async migratePLANTMACHINARY() {
    return await this.db.migratePLANTMACHINARY();
  }

  ///table56
  @Post('migrate/owndeposit')
  async migrateOWNDEPOSIT() {
    return await this.db.migrateOWNDEPOSIT();
  }

  //table57
  @Post('migrate/othersecurity')
  async migrateOTHERSECURITY() {
    return await this.db.migrateOTHERSECURITY();
  }

  //table58
  @Post('migrate/marketshare')
  async migrateMARKETSHARE() {
    return this.db.migrateMARKETSHARE();
  }

  //table59
  @Post('migrate/landbuilding')
  async migrateLANDBUILDING() {
    return this.db.migrateLANDBUILDING();
  }

  //table60
  @Post('migrate/goldsilver')
  async migrateGOLDSILVER() {
    return this.db.migrateGOLDSILVER();
  }

  //table61
  @Post('migrate/furniture')
  async migrateFURNITURE() {
    return this.db.migrateFURNITURE();
  }

  //table62
  @Post('migrate/firepolicy')
  async migrateFIREPOLICY() {
    return this.db.migrateFIREPOLICY();
  }

  //table63
  @Post('migrate/secinsurance')
  async migrateSECINSURANCE() {
    return this.db.migrateSECINSURANCE();
  }

  //table64
  @Post('migrate/govtseculic')
  async migrateGOVTSECULIC() {
    return this.db.migrateGOVTSECULIC();
  }

  ///table65
  @Post('migrate/bookdebts')
  async migrateBOOKDEBTS() {
    return this.db.migrateBOOKDEBTS();
  }

  //table66
  @Post('migrate/tdsformsubmit')
  async migrateTDSFORMSUBMIT() {
    return await this.db.migrateTDSFORMSUBMIT();
  }

  //table67
  @Post('migrate/specialinstruction')
  async migrateSPECIALINSTRUCTION() {
    return await this.db.migrateSPECIALINSTRUCTION();
  }

  //table68
  @Post('migrate/todtran')
  async migrateTODTRAN() {
    return await this.db.migrateTODTRAN();
  }

  //table69
  @Post('migrate/depoclosetran')
  async migrateDEPOCLOSETRAN() {
    return await this.db.migrateDEPOCLOSETRAN();
  }

  //table70
  @Post('migrate/interesttran')
  async migrateINTERESTTRAN() {
    return await this.db.migrateINTERESTTRAN();
  }

  //table71
  @Post('migrate/historytran')
  async migrateHISTORYTRAN() {
    return await this.db.migrateHISTORYTRAN();
  }

  //table72
  @Post('migrate/inthistorytran')
  async migrateINTHISTORYTRAN() {
    return await this.db.migrateINTHISTORYTRAN();
  }

  //table73
  @Post('migrate/dailyshrtran')
  async migrateDAILYSHRTRAN() {
    return await this.db.migrateDAILYSHRTRAN();
  }

  //table74
  @Post('migrate/depotran')
  async migrateDEPOTRAN() {
    return await this.db.migrateDEPOTRAN();
  }

  //table75
  @Post('migrate/loantran')
  async migrateLOANTRAN() {
    return await this.db.migrateLOANTRAN();
  }

  //table76
  @Post('migrate/pigmytran')
  async migratePIGMYTRAN() {
    return await this.db.migratePIGMYTRAN();
  }

  //table77
  @Post('migrate/smsmast')
  async migrateSMSMAST() {
    return await this.db.migrateSMSMAST();
  }

  //table78
  @Post('migrate/pigmychart')
  async migratePIGMYCHART() {
    return await this.db.migratePIGMYCHART();
  }

  //table79
  @Post('migrate/lockerrenttran')
  async migrateLOCKERRENTTRAN() {
    return await this.db.migrateLOCKERRENTTRAN();
  }

  //table80
  @Post('migrate/lockertran')
  async migrateLOCKERTRAN() {
    return await this.db.migrateLOCKERTRAN();
  }

  //table81
  @Post('migrate/glreportlink')
  async migrateGLREPORTLINK() {
    return await this.db.migrateGLREPORTLINK();
  }
  
  //table82
  @Post('migrate/managerview')
  async migrateMANAGERVIEW() {
    return await this.db.migrateMANAGERVIEW();
  }

  //table83
  @Post('migrate/glreportmaster')
  async migrateGLREPORTMASTER() {
    return await this.db.migrateGLREPORTMASTER();
  }

  //table84
  @Post('migrate/renewalhistory')
  async migrateRENEWALHISTORYR() {
    return await this.db.migrateRENEWALHISTORY();
  }

  //table85
  @Post('migrate/excesscash')
  async migrateEXCESSCASH() {
    return await this.db.migrateEXCESSCASH();
  }

  //table86
  @Post('migrate/standinstruction')
  async migrateSTANDINSTRUCTION() {
    return await this.db.migrateSTANDINSTRUCTION();
  }

  //table87
  @Post('migrate/intinstruction')
  async migrateINTINSTRUCTION() {
    return await this.db.migrateINTINSTRUCTION();
  }

  //table88
  @Post('migrate/intinstructionslog')
  async migrateINTINSTRUCTIONSLOG() {
    return await this.db.migrateINTINSTRUCTIONSLOG();
  }

  //table89
  @Post('migrate/intratetd')
  async migrateintrateTD() {
    return await this.db.migrateintrateTD();
  }

  //table90
  @Post('migrate/intratetdmulti')
  async migrateINTRATETDMULTI() {
    return await this.db.migrateINTRATETDMULTI();
  }

  //table91
  @Post('migrate/deprrate')
  async migrateDEPRRATE() {
    return await this.db.migrateDEPRRATE();
  }

  //table92
  @Post('migrate/intrateloan')
  async migrateINTRATELOAN() {
    return await this.db.migrateINTRATELOAN();
  }

  //table93
  @Post('migrate/intratepatschemes')
  async migrateINTRATEPATSCHEMES() {
    return await this.db.migrateINTRATEPATSCHEMES();
  }

  //table94
  @Post('migrate/prematulessrate')
  async migratePREMATULESSRATE() {
    return await this.db.migratePREMATULESSRATE();
  }

  //table95
  @Post('migrate/intratesbpg')
  async migrateINTRATESBPG() {
    return await this.db.migrateINTRATESBPG();
  }

  //table96
  @Post('migrate/securitymaster')
  async migrateSECURITYMASTER() {
    return await this.db.migrateSECURITYMASTER();
  }

  //table97
  @Post('migrate/tdsrate')
  async migrateTDSRATE() {
    return await this.db.migrateTDSRATE();
  }

  //table98
  @Post('migrate/npamaster')
  async migrateNPAMASTER() {
    return await this.db.migrateNPAMASTER();
  }

  //table99
  @Post('migrate/interrateloan')
  async migrateINTERATELOAN() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return await this.db.migrateINTERATELOAN();
  }

  //table100
  @Post('migrate/accotran')
  async migrateACCOTRAN() {
    return await this.db.migrateACCOTRAN();
  }

  //table101
  @Post('migrate/dailytran')
  async migrateDAILYTRAN() {
    return await this.db.migrateDAILYTRAN();
  }

  //table102
  @Post('migrate/passbookhistory')
  async migratePASSBOOKHISTORY() {
    return await this.db.migratePASSBOOKHISTORY();
  }

  //table103
  @Post('migrate/passbookprint')
  async migratePASSBOOKPRINT() {
    return await this.db.migratePASSBOOKPRINT();
  }

  //table104
  @Post('migrate/npalock')
  async migrateNPALOCK() {
    return await this.db.migrateNPALOCK();
  }

  //table105
  @Post('migrate/npadata')
  async migrateNPADATA() {
    return await this.db.migrateNPADATA();
  }

  //table106
  @Post('migrate/standinstructionlog')
  async migrateSTANDINSTRUCTIONLOG() {
    return await this.db.migrateSTANDINSTRUCTIONLOG();
  }

  //table107
  @Post('migrate/subsidarymaster')
  async migrateSUBSIDARYMASTER() {
    return await this.db.migrateSUBSIDARYMASTER();
  }

  //table108
  @Post('migrate/tdreceiptissue')
  async migrateTDRECEIPTISSUE() {
    return await this.db.migrateTDRECEIPTISSUE();
  }

  //table109
  @Post('migrate/dividend')
  async migrateDIVIDEND() {
    return await this.db.migrateDIVIDEND();
  }

  //table110
  @Post('migrate/divpaidtran')
  async migrateDIVPAIDTRAN() {
    return await this.db.migrateDIVPAIDTRAN();
  }

  //table111
  @Post('migrate/historydividend')
  async migrateHISTORYDIVIDEND() {
    return await this.db.migrateHISTORYDIVIDEND();
  }

  //table112
  @Post('migrate/sharetran')
  async migrateSHARETRAN() {
    return await this.db.migrateSHARETRAN();
  }

  //table113
  @Post('migrate/noticemaster')
  async migrateNOTICEMASTER() {
    return await this.db.migrateNOTICEMASTER();
  }

  //table114
  @Post('migrate/lndisputedetails')
  async migrateLNDISPUTEDETAILS() {
    return await this.db.migrateLNDISPUTEDETAILS();
  }

  //table115
  @Post('migrate/deadstockheader')
  async migrateDEADSTOCKHEADER() {
    return await this.db.migrateDEADSTOCKHEADER();
  }
  // ---------------- UI DISCOVERY ENDPOINT ----------------

  @Get('migratable-tables')
  getMigratableTables() {
    return [
      'SYSPARA', 'SCHEMAST', 'ACMASTER', 'IDMASTER', 'DPMASTER', 'LNMASTER', 'SHMASTER', 'PGMASTER', 'BRANCHMASTER', 'CASTMASTER',
      'GUARANTERDETAILS', 'SIZEWISEBALANCE', 'TERMMASTER', 'BALACATA', 'ADVOCATEMASTER', 'PREFIX', 'PRIORITYSECTORMASTER', 'RECOVERYCLEARKMASTER', 'SALARYDIVISIONMASTER', 'SUBSALARYMASTER',
      'WEAKERMASTER', 'TDRECEIPTMASTER', 'AUTHORITYMASTER', 'LOCKERRACKMASTER', 'LOCKERSIZE', 'LOCKERMASTER', 'OWNBRANCHMASTER', 'DOCUMENTMASTER', 'ITEMCATEGORYMASTER', 'COURTMASTER',
      'CATEGORYMASTER', 'BANKDETAILS', 'CITYMASTER', 'BANKMASTER', 'PGCOMMISSIONMASTER', 'TRANINPUTHEAD', 'HOLIDAYSMASTER', 'REPORTTYPEMASTER', 'DEPRCATEGORY', 'DIRECTORMASTER',
      'HEALTHMASTER', 'INDUSTRYMASTER', 'INSUARANCEMASTER', 'INTCATEGORYMASTER', 'ITEMMASTER', 'LOANSTAGEMASTER', 'NARRATIONMASTER', 'OCCUPATIONMASTER', 'OPERATIONMASTER', 'PRIORITYMASTER',
      'PURPOSEMASTER', 'STOCKSTATEMENT', 'VEHICLE', 'PLEDGESTOCK', 'PLANTMACHINARY', 'OWNDEPOSIT', 'OTHERSECURITY', 'MARKETSHARE', 'LANDBUILDING', 'GOLDSILVER',
      'FURNITURE', 'FIREPOLICY', 'SECINSURANCE', 'GOVTSECULIC', 'BOOKDEBTS', 'TDSFORMSUBMIT', 'SPECIALINSTRUCTION', 'TODTRAN', 'DEPOCLOSETRAN', 'INTERESTTRAN',
      'HISTORYTRAN', 'INTHISTORYTRAN', 'DAILYSHRTRAN', 'DEPOTRAN', 'LOANTRAN', 'PIGMYTRAN', 'SMSMAST', 'PIGMYCHART', 'LOCKERRENTTRAN', 'LOCKERTRAN',
      'GLREPORTLINK', 'MANAGERVIEW', 'STANDINSTRUCTION', 'INTINSTRUCTION', 'INTINSTRUCTIONSLOG', 'intrateTD', 'INTRATETDMULTI', 'DEPRRATE', 'INTRATELOAN', 'INTRATEPATSCHEMES',
      'PREMATULESSRATE', 'INTRATESBPG', 'SECURITYMASTER', 'TDSRATE', 'NPAMASTER', 'EXCESSCASH', 'GLREPORTMASTER', 'INTERATELOAN', 'ACCOTRAN', 'DAILYTRAN',
      'PASSBOOKHISTORY', 'PASSBOOKPRINT', 'RENEWALHISTORY', 'NPALOCK', 'NPADATA', 'STANDINSTRUCTIONLOG', 'SUBSIDARYMASTER', 'TDRECEIPTISSUE', 'DIVIDEND', 'DIVPAIDTRAN',
      'HISTORYDIVIDEND', 'SHARETRAN', 'NOTICEMASTER', 'LNDISPUTEDETAILS', 'DEADSTOCKHEADER'
    ];
  }
}