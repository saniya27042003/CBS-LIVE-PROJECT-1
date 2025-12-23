import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource('primaryDB') private readonly primaryDB: DataSource,
    @InjectDataSource('clientConnection') private readonly clientDB: DataSource,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getPrimaryData() {
    return await this.primaryDB.query('SELECT * FROM idmaster');
  }

  async getClientData() {
    return await this.clientDB.query('SELECT * FROM LNMASTER');
  }
}
