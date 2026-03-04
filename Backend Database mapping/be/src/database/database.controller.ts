import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { PostgresConfig, ClientDBConfig } from '../database/database.service';

@Controller('db')
export class DatabaseController {
  private serverConnected = false;
  private clientConnected = false;

  constructor(private readonly dbService: DatabaseService) {}

  // ---------------- CONNECT SERVER (POSTGRES) ----------------
  @Post('connect-server')
  async connectServer(@Body() config: PostgresConfig) {
    await this.dbService.getServerDataSource(config);
    this.serverConnected = true;

    return {
      success: true,
      message: 'Server database connected successfully',
    };
  }

  // ---------------- CONNECT CLIENT (ANY DB) ----------------
  @Post('connect-client')
  async connectClient(@Body() config: ClientDBConfig) {
    await this.dbService.getClientConnection(config);
    this.clientConnected = true;

    return {
      success: true,
      message: `Client database (${config.type}) connected successfully`,
    };
  }

  // ---------------- STATUS CHECK ----------------
  @Post('status')
  getStatus() {
    return {
      serverConnected: this.serverConnected,
      clientConnected: this.clientConnected,
    };
  }
}