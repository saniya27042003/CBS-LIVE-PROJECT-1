import { Body, Controller, Get, Post } from "@nestjs/common";
import { DatabaseMappingService } from "./database-mapping.service";

@Controller('database-mapping')
export class DatabaseMappingController {
  constructor(private readonly dbService: DatabaseMappingService) {}

  // ================================
  // SERVER DB (Postgres)
  // ================================
  @Post('connect-server')
  connectServer(@Body() config: any) {
    return this.dbService.connectServer(config);
  }

  @Post('server/databases')
getServerDatabases(@Body() config: any) {
  return this.dbService.getServerDatabases(config);
}



  @Get('server/tables')
  getServerTables() {
    return this.dbService.getPrimaryTableNames();
  }

  @Post('server/columns')
  getServerColumns(@Body('tableName') tableName: string) {
    return this.dbService.getAllColumnsNames(tableName);
  }

  // ================================
  // CLIENT DB (Any: PG / MSSQL / MySQL)
  // ================================
  @Post('connect-client')
  connectClient(@Body() config: any) {
    return this.dbService.connect(config);
  }

  @Get('client/tables')
  getClientTables() {
    return this.dbService.getClientTableNames();
  }

  @Post('client/columns')
  getClientColumns(@Body('tableName') tableName: string) {
    return this.dbService.getClientColumns(tableName);
  }

  @Post('client/table-structure')
  getTableStructure(@Body('tableName') tableName: string) {
    return this.dbService.getTableStructure(tableName);
  }

  // ================================
  // INSERT / MIGRATION
  // ================================
  @Post('insert-data')
  insertData(@Body() data: any) {
    return this.dbService.insertMappedData(data);
  }
}
