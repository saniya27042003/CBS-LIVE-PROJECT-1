import { Body, Controller, Get, Post } from "@nestjs/common";
import { DatabaseMappingService } from "./database-mapping.service";

@Controller('database-mapping')
export class DatabaseMappingController {
    constructor(private readonly dbService: DatabaseMappingService) { }

    @Get('idmaster')
    async getIdMaster() {
        const conn = this.dbService.getConnection();
        if (!conn) {
            return { success: false, message: 'Client DB is not connected!' };
        }
        const result = await conn.query('SELECT * FROM idmaster ORDER BY id');
        return { success: true, data: result };
    }
    //for different databse connection 
    @Post('connect-client')
    async connectClient(@Body() config: any) {
        console.log('Received config:', config);
        return this.dbService.connect(config);
    }

    @Get('getAllTableName')
    async getAllTableName() {
        return this.dbService.getAllTableNames();
    }

    @Post('getAllColumnsNames')          // primary side
    async getAllColumnsName(@Body() data: any) {
        return this.dbService.getAllColumnsNames(data.tableName);
    }

    @Post('client/getAllColumnsNames')  // client side
    async getClientColumns(@Body() data: any) {
        return this.dbService.getClientColumns(data.tableName);
    }


    @Get('primary-tables')
    getPrimaryTables() {
        return this.dbService.getPrimaryTableNames();
    }

    @Get('client-tables')
    getClientTables() {
        return this.dbService.getClientTableNames();
    }

    @Post('getTableStructure')
    async getTableStructure(@Body('tableName') tableName: string) {
        return this.dbService.getTableStructure(tableName);
    }



}
