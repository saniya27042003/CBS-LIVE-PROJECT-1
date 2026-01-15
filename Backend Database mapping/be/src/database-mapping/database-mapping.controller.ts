import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { DatabaseMappingService } from './database-mapping.service';


@Controller('database-mapping')
export class DatabaseMappingController {



  constructor(
    private readonly db: DatabaseMappingService,
  ) {}
  @Post('connect-server')
  connectServer(@Body() config: any) {
    return this.db.connectServer(config);
  }

  @Post('server/databases')
  getServerDatabases(@Body() config: any) {
    return this.db.getServerDatabases(config);
  }


  @Get('server/tables')
  getServerTables() {
    return this.db.getPrimaryTableNames();
  }

  @Post('server/columns')
  getServerColumns(@Body('tableName') tableName: string) {
    return this.db.getAllColumnsNames(tableName);
  }

  @Post('connect-client')
  connectClient(@Body() config: any) {
    return this.db.connect(config);
  }

  @Get('client/tables')
  getClientTables() {
    return this.db.getClientTableNames();
  }

  // @Get('client/diagnostic')
  // getClientDiagnostic() {
  //   return this.db.getClientDiagnostic();
  // }

  @Post('client/columns')
  getClientColumns(@Body('tableName') tableName: string) {
    return this.db.getClientColumns(tableName);
  }

  @Post('client/table-structure')
  getTableStructure(@Body('tableName') tableName: string) {
    return this.db.getTableStructure(tableName);
  }

  @Get('child-tables/:parentTable')
getChildTables(@Param('parentTable') parentTable: string) {
return this.db.getChildTables(parentTable);
}


  @Post('insert-data')
  insertData(@Body() payload: any) {
    return this.db.insertMappedData(payload);
  }
}
