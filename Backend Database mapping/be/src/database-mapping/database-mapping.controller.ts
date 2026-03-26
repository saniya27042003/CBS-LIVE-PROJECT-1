import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DatabaseMappingService } from './database-mapping.service';
import { DatabaseService } from '../database/database.service';

@Controller('database-mapping')
export class DatabaseMappingController {

  constructor(
    private readonly db: DatabaseMappingService,
    private readonly dbService: DatabaseService // ✅ Add this injection
  ) { }

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
  @Post('server/databases')
  async getServerDatabases(@Body() config: any) {
    // This calls your existing service method
    return this.db.getServerDatabases(config);
  }


  @Get('server/tables')
  async getServerTables() {
    // This calls your existing method to get the dynamic table list
    return this.db.getPrimaryTableNames();
  }

  @Get('server/columns/:tableName')
  async getServerColumns(@Param('tableName') tableName: string) {
    // 1. Get the existing active connection from DatabaseService
    const conn = this.dbService.getServerDataSourceInstance();

    if (!conn) {
      console.error("Handshake Failed: Postgres not connected.");
      return [];
    }

    // 2. Call the getColumnNames method we fixed with LOWER()
    return await this.dbService.getColumnNames(conn, tableName);
  }

  //   @Post('connect-client')
  //   connectClient(@Body() config: any) {
  //     return this.db.connect(config);
  //   }

  @Get('client/tables')
  getClientTables() {
    return this.db.getClientTableNames();
  }

  //   // @Get('client/diagnostic')
  //   // getClientDiagnostic() {
  //   //   return this.db.getClientDiagnostic();
  //   // }

  @Get('client/columns/:tableName')
  async getClientColumns(@Param('tableName') tableName: string) {
    // 1. Get the active Oracle/Client connection
    const conn = await this.dbService.getClientConnectionInstance();

    if (!conn) {
      console.error("Handshake Failed: Client not connected.");
      return [];
    }

    // 2. Fetch Oracle columns
    return await this.dbService.getColumnNames(conn, tableName);
  }

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
