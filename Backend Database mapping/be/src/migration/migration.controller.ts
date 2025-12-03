import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { MigrateService } from './migration.service';
import type { Response } from 'express';

@Controller('migrate')
export class MigrateController {
  constructor(private _service: MigrateService) {}
  //     //check script
  //     @Post('/script')
  //     async Script(@Body() data) {
  //         // return await this._service.script(data);
  //         return await this._service.script();
  //     }

  //     // @Post('/ACMASTER')
  //     // async ACMASTER() {
  //     //     return await this._service.ACMASTER()
  //     // }

  // //     @Post('/ACMASTER')
  // // async ACMASTER(@Body('fieldMapping') fieldMapping: Record<string, string>) {
  // //   return this._service.ACMASTER(fieldMapping);
  // // }

  // //  @Post('/ACMASTER')
  // //   async ACMASTER(
  // //     @Body('fieldMapping') fieldMapping: Record<string, string>,
  // //     @Query('action') action: string,   // action = 'download' or 'insert'
  // //     @Res() res: Response
  // //   ) {
  // //     // Call service and pass action + response object
  // //     await this._service.ACMASTER(fieldMapping, action, res);
  // //   }

  // @Post('/ACMASTER')
  // async ACMASTER(
  //   @Body('fieldMapping') fieldMapping: Record<string, string>,
  //   @Query('action') action: string,          // action = 'download' or 'insert'
  //   @Query('conversionType') conversionType: string, // marathi | english | both
  //   @Res() res: Response
  // ) {
  //   // Call service and pass action + conversionType + response object
  //   await this._service.ACMASTER(fieldMapping, action, conversionType, res);
  // }

  //   @Post('/convertdv')
  //   async convert_dvbw(@Body() body: { text: string}) {
  //     return this._service.convert_dvbw(body.text);
  //   }

  //   @Get('/convert')
  //   async convert(){
  //     return await this._service.searchMarathiNames()
  //   }

  // //   @Post()
  // //   async ACMASTER(
  // //     @Body('fieldMapping') fieldMapping: Record<string, string>,
  // //     @Query('action') action: string,   // download / insert
  // //      @Res() res: Response
  // //   ) {
  // //     return this._service.ACMASTER(fieldMapping, action, res);
  // //   }

  //     @Post('/ADVOCATEMASTER')
  //     async ADVOCATEMASTER() {
  //         return await this._service.ADVOCATEMASTER()
  //     }

  //     @Post('/AUTHORITYMASTER')
  //     async AUTHORITYMASTER() {
  //         return await this._service.AUTHORITYMASTER()
  //     }

  //     @Post('/BANKMASTER')
  //     async BANKMASTER() {
  //         return await this._service.BANKMASTER()
  //     }

  //     @Post('/BANKDETAILS')
  //     async BANKDETAILS() {
  //         return await this._service.BANKDETAILS()
  //     }

  //     @Post('/CASTMASTER')
  //     async CASTMASTER() {
  //         return await this._service.CASTMASTER()
  //     }

  //     @Post('/CATEGORYMASTER')
  //     async CATEGORYMASTER() {
  //         return await this._service.CATEGORYMASTER()
  //     }

  //     @Post('/CITYMASTER')
  //     async CITYMASTER() {
  //         return await this._service.CITYMASTER()
  //     }

  //     @Post('/COURTMASTER')
  //     async COURTMASTER() {
  //         return await this._service.COURTMASTER()
  //     }

  //     @Post('/BRANCHMASTER')
  //     async BRANCHMASTER() {
  //         return await this._service.BRANCHMASTER()
  //     }

  //     @Post('/DIRECTORMASTER')
  //     async DIRECTORMASTER() {
  //         return await this._service.DIRECTORMASTER()
  //     }

  //     @Post('/DOCUMENTMASTER')
  //     async DOCUMENTMASTER() {
  //         return await this._service.DOCUMENTMASTER()
  //     }

  //     @Post('/TRANINPUTHEAD')
  //     async TRANINPUTHEAD() {
  //         return await this._service.TRANINPUTHEAD()
  //     }

  //     @Post('/DEPRCATEGORY')
  //     async DEPRCATEGORY() {
  //         return await this._service.DEPRCATEGORY()
  //     }

  //     @Post('/DEPRRATE')
  //     async DEPRRATE() {
  //         return await this._service.DEPRRATE()
  //     }

  //     @Post('/INTRATELOAN')
  //     async INTRATELOAN() {
  //         return await this._service.INTRATELOAN()
  //     }

  //     @Post('/INTRATEPATSCHEMES')
  //     async INTRATEPATSCHEMES() {
  //         return await this._service.INTRATEPATSCHEMES()
  //     }

  //     @Post('/PREMATULESSRATE')
  //     async PREMATULESSRATE() {
  //         return await this._service.PREMATULESSRATE()
  //     }

  //     @Post('/HEALTHMASTER')
  //     async HEALTHMASTER() {
  //         return await this._service.HEALTHMASTER()
  //     }

  //     @Post('/HOLIDAYSMASTER')
  //     async HOLIDAYSMASTER() {
  //         return await this._service.HOLIDAYSMASTER()
  //     }

  //     @Post('/INDUSTRYMASTER')
  //     async INDUSTRYMASTER() {
  //         return await this._service.INDUSTRYMASTER()
  //     }

  //     @Post('/INSUARANCEMASTER')
  //     async INSUARANCEMASTER() {
  //         return await this._service.INSUARANCEMASTER()
  //     }

  //     @Post('/INTCATEGORYMASTER')
  //     async INTCATEGORYMASTER() {
  //         return await this._service.INTCATEGORYMASTER()
  //     }

  //     @Post('/ITEMCATEGORYMASTER')
  //     async ITEMCATEGORYMASTER() {
  //         return await this._service.ITEMCATEGORYMASTER()
  //     }

  //     @Post('/INTRATESBPG')
  //     async INTRATESBPG() {
  //         return await this._service.INTRATESBPG()
  //     }

  //     @Post('/SECURITYMASTER')
  //     async SECURITYMASTER() {
  //         return await this._service.SECURITYMASTER()
  //     }

  //     @Post('/TDSRATE')
  //     async TDSRATE() {
  //         return await this._service.TDSRATE()
  //     }

  //     @Post('/ITEMMASTER')
  //     async ITEMMASTER() {
  //         return await this._service.ITEMMASTER()
  //     }

  //     @Post('/LOANSTAGEMASTER')
  //     async LOANSTAGEMASTER() {
  //         return await this._service.LOANSTAGEMASTER()
  //     }

  //     @Post('/LOCKERRACKMASTER')
  //     async LOCKERRACKMASTER() {
  //         return await this._service.LOCKERRACKMASTER()
  //     }

  //     @Post('/LOCKERSIZE')
  //     async LOCKERSIZE() {
  //         return await this._service.LOCKERSIZE()
  //     }

  //     @Post('/LOCKERMASTER')
  //     async LOCKERMASTER() {
  //         return await this._service.LOCKERMASTER()
  //     }

  //     @Post('/BALACATA')
  //     async BALACATA() {
  //         return await this._service.BALACATA()
  //     }

  //     @Post('/NARRATIONMASTER')
  //     async NARRATIONMASTER() {
  //         return await this._service.NARRATIONMASTER()
  //     }

  //     @Post('/OCCUPATIONMASTER')
  //     async OCCUPATIONMASTER() {
  //         return await this._service.OCCUPATIONMASTER()
  //     }

  //     @Post('/OPERATIONMASTER')
  //     async OPERATIONMASTER() {
  //         return await this._service.OPERATIONMASTER()
  //     }

  //     @Post('/OWNBRANCHMASTER')
  //     async OWNBRANCHMASTER() {
  //         return await this._service.OWNBRANCHMASTER()
  //     }

  //     @Post('/TDSFORMSUBMIT')
  //     async TDSFORMSUBMIT() {
  //         return await this._service.TDSFORMSUBMIT()
  //     }

  //     @Post('/PREFIX')
  //     async PREFIX() {
  //         return await this._service.PREFIX()
  //     }

  //     @Post('/SYSPARA')
  //     async SYSPARA() {
  //         return await this._service.SYSPARA()
  //     }

  //     // @Post('/PRIORITYSECTORMASTER')
  //     // async PRIORITYSECTORMASTER() {
  //     //     return await this._service.PRIORITYSECTORMASTER()
  //     // }

  //     @Post('/PGCOMMISSIONMASTER')
  //     async PGCOMMISSIONMASTER() {
  //         return await this._service.PGCOMMISSIONMASTER()
  //     }

  //     @Post('/PRIORITYMASTER')
  //     async PRIORITYMASTER() {
  //         return await this._service.PRIORITYMASTER()
  //     }

  //     @Post('/PURPOSEMASTER')
  //     async PURPOSEMASTER() {
  //         return await this._service.PURPOSEMASTER()
  //     }

  //     @Post('/RECOVERYCLEARKMASTER')
  //     async RECOVERYCLEARKMASTER() {
  //         return await this._service.RECOVERYCLEARKMASTER()
  //     }

  //     @Post('/REPORTTYPEMASTER')
  //     async REPORTTYPEMASTER() {
  //         return await this._service.REPORTTYPEMASTER()
  //     }

  //     @Post('/RISKCATEGORYMASTER')
  //     async RISKCATEGORYMASTER() {
  //         return await this._service.RISKCATEGORYMASTER()
  //     }

  //     @Post('/SALARYDIVISIONMASTER')
  //     async SALARYDIVISIONMASTER() {
  //         return await this._service.SALARYDIVISIONMASTER()
  //     }

  //     @Post('/SUBSALARYMASTER')
  //     async SUBSALARYMASTER() {
  //         return await this._service.SUBSALARYMASTER()
  //     }

  //     @Post('/WEAKERMASTER')
  //     async WEAKERMASTER() {
  //         return await this._service.WEAKERMASTER()
  //     }

  //     @Post('/SCHEMAST')
  //     async SCHEMAST() {
  //         return await this._service.SCHEMAST()
  //     }

  //     @Post('/IDMASTER')
  //     async IDMASTER() {
  //         return await this._service.IDMASTER()
  //     }

  //     // @Post('/idmasterCorrection')
  //     // async idmasterCorrection() {
  //     //     return await this._service.idmasterCorrection()
  //     // }

  //     // @Post('/CUSTOMERADDRESS')
  //     // async CUSTOMERADDRESS() {
  //     //     return await this._service.CUSTOMERADDRESS()
  //     // }

  //     @Post('/SHMASTER')
  //     async SHMASTER() {
  //         return await this._service.SHmasterScript()
  //     }

  //     @Post('/DPMASTER')
  //     async DPMASTER() {
  //         return await this._service.DPMASTERScript()
  //     }

  //     @Post('/PGMASTER')
  //     async PGMASTERSCRIPT() {
  //         return await this._service.PGmasterScript()
  //     }

  //     @Post('/NPAMASTER')
  //     async NPAMASTER() {
  //         return await this._service.NPAMASTER()
  //     }

  //     @Post('/BOOKDEBTS')
  //     async BOOKDEBTS() {
  //         return await this._service.BOOKDEBTS()
  //     }

  //     @Post('/OTHERSECURITY')
  //     async OTHERSECURITY() {
  //         return await this._service.OTHERSECURITY()
  //     }

  //     @Post('/PLEDGESTOCK')
  //     async PLEDGESTOCK() {
  //         return await this._service.PLEDGESTOCK()
  //     }

  //     @Post('/VEHICLE')
  //     async VEHICLE() {
  //         return await this._service.VEHICLE()
  //     }

  //     @Post('/STOCKSTATEMENT')
  //     async STOCKSTATEMENT() {
  //         return await this._service.STOCKSTATEMENT()
  //     }

  //     @Post('/PLANTMACHINARY')
  //     async PLANTMACHINARY() {
  //         return await this._service.PLANTMACHINARY()
  //     }

  //     @Post('/OWNDEPOSIT')
  //     async OWNDEPOSIT() {
  //         return await this._service.OWNDEPOSIT()
  //     }

  //     @Post('/SECINSURANCE')
  //     async SECINSURANCE() {
  //         return await this._service.SECINSURANCE()
  //     }

  //     @Post('/LANDBUILDING')
  //     async LANDBUILDING() {
  //         return await this._service.LANDBUILDING()
  //     }

  //     @Post('/MARKETSHARE')
  //     async MARKETSHARE() {
  //         return await this._service.MARKETSHARE()
  //     }

  //     @Post('/GOLDSILVER')
  //     async GOLDSILVER() {
  //         return await this._service.GOLDSILVER()
  //     }

  //     @Post('/GOVTSECULIC')
  //     async GOVTSECULIC() {
  //         return await this._service.GOVTSECULIC()
  //     }

  //     @Post('/FIREPOLICY')
  //     async FIREPOLICY() {
  //         return await this._service.FIREPOLICY()
  //     }

  //     @Post('/FURNITURE')
  //     async FURNITURE() {
  //         return await this._service.FURNITURE()
  //     }

  //     @Post('/TDRECEIPTMASTER')
  //     async TDRECEIPTMASTER() {
  //         return await this._service.TDRECEIPTMASTER()
  //     }

  //     @Post('/LNMASTER')
  //     async LNMASTER() {
  //         return await this._service.lnmasterScript()
  //     }

  //     @Post('/DIVPAIDTRAN')
  //     async DIVPAIDTRAN() {
  //         return await this._service.DIVPAIDTRAN()
  //     }

  //     @Post('/INTINSTRUCTION')
  //     async INTINSTRUCTION() {
  //         return await this._service.INTINSTRUCTION()
  //     }

  //     @Post('/STANDINSTRUCTION')
  //     async STANDINSTRUCTION() {
  //         return await this._service.STANDINSTRUCTION()
  //     }

  //     @Post('/SPECIALINSTRUCTION')
  //     async SPECIALINSTRUCTION() {
  //         return await this._service.SPECIALINSTRUCTION()
  //     }

  //     @Post('/intrateTD')
  //     async intrateTD() {
  //         return await this._service.intrateTD()
  //     }

  //     @Post('/RENEWALHISTORY')
  //     async RENEWALHISTORY() {
  //         return await this._service.RENEWALHISTORY()
  //     }

  //     @Post('/INTRATETDMULTI')
  //     async INTRATETDMULTI() {
  //         return await this._service.INTRATETDMULTI()
  //     }

  //     // @Post('/PGMASTER')
  //     // async PGMASTER() {
  //     //     return await this._service.PGMASTER()
  //     // }

  //     @Post('/ACCOTRAN')
  //     async ACCOTRAN() {
  //         return await this._service.ACCOTRAN()
  //     }

  //     @Post('/DEPOTRAN')
  //     async DEPOTRAN() {
  //         return await this._service.DEPOTRAN()
  //     }

  //     @Post('/LOANTRAN')
  //     async LOANTRAN() {
  //         return await this._service.LOANTRAN()
  //     }

  //     @Post('/SHARETRAN')
  //     async SHARETRAN() {
  //         return await this._service.SHARETRAN()
  //     }

  //     @Post('/PIGMYTRAN')
  //     async PIGMYTRAN() {
  //         return await this._service.PIGMYTRAN()
  //     }

  //     @Post('/INTERESTTRAN')
  //     async INTERESTTRAN() {
  //         return await this._service.INTERESTTRAN()
  //     }

  //     @Post('/TODTRAN')
  //     async TODTRAN() {
  //         return await this._service.TODTRAN()
  //     }

  //     @Post('/HISTORYTRAN')
  //     async HISTORYTRAN() {
  //         return await this._service.HISTORYTRAN()
  //     }

  //     @Post('/HISTORYDIVIDEND')
  //     async HISTORYDIVIDEND() {
  //         return await this._service.HISTORYDIVIDEND()
  //     }

  //     @Post('/DAILYTRAN')
  //     async DAILYTRAN() {
  //         return await this._service.DAILYTRAN()
  //     }

  //     @Post('/updateBal')
  //     utility(@Body() data) {
  //         return this._service.updateBal(data);
  //     }

  //     @Post('/IDmasterutility')
  //     IDmasterutility(@Body() data) {
  //         return this._service.shmasterrec(data);
  //     }

  //     //     @Post('/ACMASTER')
  //     //     async ACMASTER(
  //     // @Body('fieldMapping') fieldMapping: Record<string, string>,
  //     // @Query('action') action: string,          // action = 'download' or 'insert'
  //     // @Query('conversionType') conversionType: string, // marathi | english | both
  //     // @Res() res: Response
  //     // ) {
  //     // // Call service and pass action + conversionType + response object
  //     // await this._service.ACMASTER(fieldMapping, action, conversionType, res);
  //     // }

  //  @Post('/IDMASTERDATA')
  //   async IDMASTERdata(
  //     @Body('fieldMapping') fieldMapping: Record<string, string>,
  //     @Query('action') action: string,   // action = 'download' or 'insert'
  //     @Res() res: Response
  //   ) {
  //     // Call service and pass action + response object
  //     await this._service.IDMASTERdata(fieldMapping, action, res);
  //   }

  // @Get('/getAllTableName')
  // async getAllTableName(@Body() data: any) {
  //     return this._service.getAllTableNames();
  // }

  // @Post('/getAllColumnsNames')
  // async getAllColumnsName(@Body() data: any) {
  //     return this._service.getAllColumnsNames(data.tableName);
  // }
}

// }

// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { MigrateService } from './migration.service';

// @Controller('migrate')
// export class MigrateController {
//     constructor(private readonly migrateService: MigrateService) { }

//     // ✅ Added endpoint for frontend connect
//     @Post('connect')
//     async connectDatabase(@Body() body: any) {
//         try {
//             console.log('✅ Received connection request:', body);
//             return { success: true, message: 'Connection successful!' };
//         } catch (error) {
//             console.error('❌ Connection failed:', error);
//             return { success: false, message: error.message };
//         }
//     }

//     @Get('getAllTableName')
//     async getAllTableName() {
//         try {
//             const result = await this.migrateService.getAllTableNames();
//             return { success: true, message: result };
//         } catch (error) {
//             console.error('❌ Failed to fetch table names:', error);
//             return { success: false, message: error.message };
//         }
//     }

//     @Post('getAllColumnsNames')
//     async getAllColumnsName(@Body() body: any) {
//         try {
//             const result = await this.migrateService.getAllColumnsNames(body.tableName);
//             return { success: true, message: result };
//         } catch (error) {
//             console.error('❌ Failed to fetch column names:', error);
//             return { success: false, message: error.message };
//         }
//     }
// }
