import { Body, Controller, Get, Post } from "@nestjs/common";
import { DatabaseMappingService } from "./database-mapping.service";

@Controller('database-mapping')
export class DatabaseMappingController {
  constructor(private readonly dbService: DatabaseMappingService,
    private readonly databaseMappingService: DatabaseMappingService

  ) { }

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

  @Get("client/relationships/fast")
  getFastRelationships() {
    return this.dbService.getRealForeignKeysFast();
  }

  @Get("client/relationships/real")
  getRealRelationships() {
    return this.dbService.getRealForeignKeys();
  }

  @Get("client/relationships/predict")
  getPredictedRelationships() {
    return this.dbService.predictFastRelationships();
  }

  @Get("client/visual-map")
  getVisualMap() {
    return this.dbService.getVisualizationMap();
  }

  @Get("client/table-map")
  getTableMap() {
    return this.dbService.getTableStructureWithKeys();
  }

  @Post("migrate-multiple")
  async migrateMultiple(@Body() body: any) {
    return this.databaseMappingService.migrateMultipleTables(body);
  }
  
}
