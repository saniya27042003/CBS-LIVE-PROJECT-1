import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseMappingService } from './database-mapping.service';

@Controller('database-mapping')
export class DatabaseMappingController {

  constructor(private readonly db: DatabaseMappingService) {}

  // -------- CONNECT SERVER DB --------
  @Post('connect-server')
  async connectServer(@Body() config: any) {
    return this.db.connectServer(config);
  }

  // -------- CONNECT CLIENT DB --------
  @Post('connect-client')
  async connectClient(@Body() config: any) {
    return this.db.connectClient(config);
  }

  // -------- RUN IDMASTER MIGRATION --------
  @Post('migrate/idmaster')
  async migrateIDMASTER() {
    return this.db.migrateIDMASTER();
  }


   @Post('migrate/dpmaster')
  async migrateDPMASTER() {
    return this.db.migrateDPMASTER();
  }

   @Post('migrate/lnmaster')
  async migrateLNMASTER() {
    return this.db.migrateLNMASTER();
  }

   @Post('migrate/pgmaster')
  async migratePGMASTER() {
    return this.db.migratePGMASTER();
  }
  

   @Post('migrate/shmaster')
  async migrateSHMASTER() {
    return this.db.migrateSHMASTER();
  }



  @Post('migrate/branchmaster')
  async migrateBRANCHMASTER() {
    return await this.db.migrateBRANCHMASTER();
  }

  @Post('migrate/castmaster')
  async migrateCASTMASTER() { 
    return this.db.migrateCASTMASTER();
  }

   @Post('migrate/schemast')
  async migrate() { 
    return this.db.migrateSCHEMAST();
  }

   @Post('migrate/syspara')
  async migrateSYSPARA() { 
    return this.db.migrateSCHEMAST();
  }

    @Post('migrate/guaranterdetails')
  async migrateGUARANTERDETAILS() { 
    return this.db.migrateGUARANTERDETAILS();
  }

    @Post('migrate/acmaster')
  async migrateACMASTER() { 
    return this.db.migrateACMASTER();
  }

//   @Post('connect-server')
//   connectServer(@Body() config: any) {
//     return this.db.connectServer(config);
//   }

//   @Post('server/databases')
//   getServerDatabases(@Body() config: any) {
//     return this.db.getServerDatabases(config);
//   }


//   @Get('server/tables')
//   getServerTables() {
//     return this.db.getPrimaryTableNames();
//   }

//   @Post('server/columns')
//   getServerColumns(@Body('tableName') tableName: string) {
//     return this.db.getAllColumnsNames(tableName);
//   }

//   @Post('connect-client')
//   connectClient(@Body() config: any) {
//     return this.db.connect(config);
//   }

//   @Get('client/tables')
//   getClientTables() {
//     return this.db.getClientTableNames();
//   }

//   // @Get('client/diagnostic')
//   // getClientDiagnostic() {
//   //   return this.db.getClientDiagnostic();
//   // }

//   @Post('client/columns')
//   getClientColumns(@Body('tableName') tableName: string) {
//     return this.db.getClientColumns(tableName);
//   }

//   @Post('client/table-structure')
//   getTableStructure(@Body('tableName') tableName: string) {
//     return this.db.getTableStructure(tableName);
//   }

//   @Get('child-tables/:parentTable')
// getChildTables(@Param('parentTable') parentTable: string) {
// return this.db.getChildTables(parentTable);
// }


//   @Post('insert-data')
//   insertData(@Body() payload: any) {
//     return this.db.insertMappedData(payload);
//   }
}
