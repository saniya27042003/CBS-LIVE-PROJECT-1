// import { Injectable } from '@angular/core';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
// import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  private clientDB: DataSource | null = null;
}
