import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-database',
  standalone: true,
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule]
})
export class DatabaseComponent implements OnInit {

  // =========================
  // TARGET DB ICONS
  // =========================
  databases = [
    { name: 'MySQL', img: 'assets/images/mysql.png' },
    { name: 'MsSQL', img: 'assets/images/mssql.png' },
    { name: 'Postgres', img: 'assets/images/postgres.png' },
    { name: 'MariaDB', img: 'assets/images/mariadb2(2).png' },
    { name: 'MongoDB', img: 'assets/images/mongodb.png' },
    { name: 'Oracle', img: 'assets/images/oracle.png' },
  ];

  // =========================
  // ✅ PRIMARY (SERVER) FORM
  // =========================
  primaryForm!: FormGroup;

  // =========================
  // ✅ CLIENT (TARGET) FORM
  // =========================
  clientForm!: FormGroup;

  // =========================
  // ✅ Selected SERVER DB
  // =========================
  selectedDatabase: string = '';

  // ✅ ✅ ✅ DATABASE LIST FROM SERVER
  databaseList: string[] = [];

  // =========================
  // UI STATE
  // =========================
  primaryClassMap: { [key: string]: string } = {};
  clientClassMap: { [key: string]: string } = {};

  loadingDatabases = false;

  // =========================
  // MESSAGE BOX
  // =========================
  messageBox = {
    visible: false,
    text: '',
    type: 'success' as 'success' | 'error'
  };

  navigateAfterSuccess = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {

    // ✅ SERVER FORM
    this.primaryForm = this.fb.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // ✅ CLIENT FORM
    this.clientForm = this.fb.group({
      type: ['', Validators.required],
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      database: ['', Validators.required],
    });
  }

  // =========================
  // UI SELECTIONS
  // =========================
  selectPrimary(dbName: string) {
    this.primaryClassMap = {};
    this.primaryClassMap[dbName] = 'ring-4 ring-green-400';
  }

  selectClient(dbName: string) {
    this.clientClassMap = {};
    this.clientClassMap[dbName] = 'ring-4 ring-green-400';

    // ✅ CORRECT DRIVER MAPPING
    const typeMap: any = {
      MySQL: 'mysql',
      MsSQL: 'mssql',
      Postgres: 'postgres',
      MariaDB: 'mysql',
      MongoDB: 'mongodb',
      Oracle: 'oracle'
    };

    this.clientForm.patchValue({
      type: typeMap[dbName]
    });
  }

  // =========================
  // ✅ LOAD SERVER DATABASE LIST (FIXED — ONLY ONE VERSION)
  // =========================
  onOpenDatabaseDropdown() {

    if (this.primaryForm.invalid) {
      this.showMessage('Enter server credentials first', 'error');
      return;
    }

    const payload = {
      host: this.primaryForm.value.host,
      port: this.primaryForm.value.port,
      username: this.primaryForm.value.username,
      password: this.primaryForm.value.password,
    };

    this.loadingDatabases = true;

    this.http.post<string[]>(
      'http://localhost:3000/database-mapping/server/databases',
      payload
    ).subscribe({
      next: (dbs) => {
        this.loadingDatabases = false;
        this.databaseList = dbs || [];
      },
      error: (err) => {
        this.loadingDatabases = false;
        console.error(err);
        this.showMessage('Failed to load databases from server', 'error');
      }
    });
  }

  // =========================
  // ✅ CONNECT BUTTON
  // =========================
  onOkClick() {

    // ✅ 1) Validate PRIMARY (SERVER)
    if (this.primaryForm.invalid) {
      this.showMessage('Fill ALL Primary (Server) credentials.', 'error');
      return;
    }

    if (!this.selectedDatabase) {
      this.showMessage('Please select a Source (server) database.', 'error');
      return;
    }

    // ✅ 2) Validate CLIENT
    if (this.clientForm.invalid) {
      this.showMessage('Fill ALL Client database credentials.', 'error');
      return;
    }

    // ✅ 3) CONNECT SERVER
    const primaryConfig = {
      type: 'postgres',
      host: this.primaryForm.value.host,
      port: Number(this.primaryForm.value.port),
      username: this.primaryForm.value.username,
      password: this.primaryForm.value.password,
      database: this.selectedDatabase
    };

    this.http.post(
      'http://localhost:3000/database-mapping/connect-server',
      primaryConfig
    ).subscribe({
      next: (res: any) => {

        if (!res?.success) {
          this.showMessage('Server connection failed', 'error');
          return;
        }

        // ✅ 4) CONNECT CLIENT
        const clientConfig = {
          type: this.clientForm.value.type,
          host: this.clientForm.value.host,
          port: Number(this.clientForm.value.port),
          username: this.clientForm.value.username,
          password: this.clientForm.value.password,
          database: this.clientForm.value.database
        };

        console.log('✅ CLIENT CONFIG SENT:', clientConfig);

        this.http.post(
          'http://localhost:3000/database-mapping/connect-client',
          clientConfig
        ).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.navigateAfterSuccess = true;
              this.showMessage(
                '✅ Both Server & Client Databases Connected Successfully!',
                'success'
              );
            } else {
              this.showMessage(
                'Client connection failed: ' + res.message,
                'error'
              );
            }
          },
          error: (err) => {
            console.error('Client connect error:', err);
            this.showMessage('Failed to connect Client database.', 'error');
          }
        });

      },
      error: (err) => {
        console.error('Server connect error:', err);
        this.showMessage('Failed to connect Server (source) database.', 'error');
      }
    });
  }

  // =========================
  // CANCEL
  // =========================
  onCancelClick() {
    this.primaryForm.reset();
    this.clientForm.reset();
    this.selectedDatabase = '';
    this.databaseList = [];
    this.primaryClassMap = {};
    this.clientClassMap = {};
  }

  // =========================
  // MESSAGE BOX
  // =========================
  showMessage(text: string, type: 'success' | 'error') {
    this.messageBox.text = text;
    this.messageBox.type = type;
    this.messageBox.visible = true;
  }

  closeMessageBox() {
    this.messageBox.visible = false;

    if (this.navigateAfterSuccess) {
      this.navigateAfterSuccess = false;

      this.router.navigate(['/table'], {
        queryParams: {
          primary: this.selectedDatabase,
          client: this.clientForm.value.database
        }
      });
    }
  }
}
