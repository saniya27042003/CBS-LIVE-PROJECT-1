import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DbStateService } from '../../service/db-state.service';

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
  // FORMS
  // =========================
  primaryForm!: FormGroup;
  clientForm!: FormGroup;

  // =========================
  // STATE
  // =========================
  selectedDatabase: string = '';
  databaseList: string[] = [];
  
  primaryClassMap: { [key: string]: string } = {};
  clientClassMap: { [key: string]: string } = {};

  loadingDatabases = false;
  isConnecting = false; 

  messageBox = {
    visible: false,
    text: '',
    type: 'success' as 'success' | 'error'
  };

  navigateAfterSuccess = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private dbState: DbStateService
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    // AUTH CHECK
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        const saved = localStorage.getItem('auth_token');
        if (!saved) {
          this.router.navigate(['/login']);
        }
      }
    });

    // FORM INIT
    this.primaryForm = this.fb.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.clientForm = this.fb.group({
      type: ['', Validators.required],
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      database: ['', Validators.required],
    });

    // RESTORE STATE
    if (this.dbState.primaryForm) {
      this.primaryForm.patchValue(this.dbState.primaryForm);
      this.clientForm.patchValue(this.dbState.clientForm);

      this.selectedDatabase = this.dbState.selectedDatabase;
      this.databaseList = this.dbState.databaseList;

      this.primaryClassMap = this.dbState.primaryClassMap;
      this.clientClassMap = this.dbState.clientClassMap;
    }
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

    const typeMap: any = {
      MySQL: 'mysql',
      MsSQL: 'mssql',
      Postgres: 'postgres',
      MariaDB: 'mariadb',
      MongoDB: 'mongodb',
      Oracle: 'oracle'
    };

    this.clientForm.patchValue({
      type: typeMap[dbName]
    });
  }

  // =========================
  // LOAD SERVER DATABASES
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
  // CONNECT ACTION
  // =========================
  onOkClick() {
    // 1) Validate Primary
    if (this.primaryForm.invalid) {
      this.showMessage('Fill ALL Primary (Server) credentials.', 'error');
      return;
    }

    if (!this.selectedDatabase) {
      this.showMessage('Please select a Source (server) database.', 'error');
      return;
    }

    // 2) Validate Client
    if (this.clientForm.invalid) {
      this.showMessage('Fill ALL Client database credentials.', 'error');
      return;
    }

    this.isConnecting = true;

    // 3) Connect Server
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
          this.isConnecting = false;
          this.showMessage('Server connection failed', 'error');
          return;
        }

        // 4) Connect Client
        const clientConfig = {
          type: this.clientForm.value.type,
          host: this.clientForm.value.host,
          port: Number(this.clientForm.value.port),
          username: this.clientForm.value.username,
          password: this.clientForm.value.password,
          database: this.clientForm.value.database
        };

        this.http.post(
          'http://localhost:3000/database-mapping/connect-client',
          clientConfig
        ).subscribe({
          next: (res: any) => {
            this.isConnecting = false;
            if (res.success) {
              this.navigateAfterSuccess = true;
              this.showMessage(
                'Both Server & Client Databases Connected Successfully!',
                'success'
              );
            } else {
              this.showMessage('Client connection failed: ' + res.message, 'error');
            }
          },
          error: (err) => {
            this.isConnecting = false;
            console.error('Client connect error:', err);
            this.showMessage('Failed to connect Client database.', 'error');
          }
        });
      },
      error: (err) => {
        this.isConnecting = false;
        console.error('Server connect error:', err);
        this.showMessage('Failed to connect Server (source) database.', 'error');
      }
    });
  }

  // =========================
  // CANCEL / RESET
  // =========================
  onCancelClick() {
    this.primaryForm.reset();
    this.clientForm.reset();
    this.selectedDatabase = '';
    this.databaseList = [];
    this.primaryClassMap = {};
    this.clientClassMap = {};
    this.dbState.clear();
  }

  // =========================
  // MESSAGE BOX HELPER
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