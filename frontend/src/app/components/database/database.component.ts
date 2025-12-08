import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-database',
  standalone: true,
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class DatabaseComponent implements OnInit {

  databases = [
    { name: 'MySQL', img: 'assets/images/mysql.png' },
    { name: 'MsSQL', img: 'assets/images/mssql.png' },
    { name: 'Postgres', img: 'assets/images/postgres.png' },
    { name: 'MariaDB', img: 'assets/images/mariadb2(2).png' },
    { name: 'MongoDB', img: 'assets/images/mongodb.png' },
    { name: 'Oracle', img: 'assets/images/oracle.png' },
  ];

  selectedPrimary: string | null = null;
  selectedClient: string | null = null;

  primaryClassMap: { [key: string]: string } = {};
  clientClassMap: { [key: string]: string } = {};

  databaseForm!: FormGroup;

  // ✅ MESSAGE BOX STATE
  messageBox = {
    visible: false,
    text: '',
    type: 'success' as 'success' | 'error'
  };

  // ✅ STORE NAVIGATION UNTIL USER CLICKS OK
  navigateAfterSuccess = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.databaseForm = this.fb.group({
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      port: ['', Validators.required],
      host: ['', Validators.required],
      database: ['', Validators.required]
    });
  }

  selectPrimary(dbName: string) {
    this.primaryClassMap = {};
    this.primaryClassMap[dbName] = 'ring-4 ring-green-400';
  }

  selectClient(dbName: string) {
    this.clientClassMap = {};
    this.clientClassMap[dbName] = 'ring-4 ring-green-400';
    this.databaseForm.patchValue({ type: dbName });
  }

  onOkClick() {
  if (this.databaseForm.invalid) {
    this.showMessage('Please fill all required fields correctly.', 'error');
    return;
  }

  const dbConfig = {
    type: this.databaseForm.value.type.toLowerCase(), // ✅ FIXED
    host: this.databaseForm.value.host,
    port: this.databaseForm.value.port,
    username: this.databaseForm.value.username,
    password: this.databaseForm.value.password,
    database: this.databaseForm.value.database
  };

  // ✅ 1️⃣ CONNECT PRIMARY (SERVER)
  this.http.post('http://localhost:3000/database-mapping/connect-server', dbConfig)
    .subscribe({
      next: (serverRes: any) => {
        if (!serverRes.success) {
          this.showMessage('Primary DB connection failed', 'error');
          return;
        }

        // ✅ 2️⃣ CONNECT CLIENT
        this.http.post('http://localhost:3000/database-mapping/connect-client', dbConfig)
          .subscribe({
            next: (clientRes: any) => {
              if (clientRes.success) {
                this.navigateAfterSuccess = true;
                this.showMessage('Both Databases Connected Successfully!', 'success');
              } else {
                this.showMessage('Client connection failed: ' + clientRes.message, 'error');
              }
            },
            error: () => {
              this.showMessage('Failed to connect Client database.', 'error');
            }
          });
      },
      error: () => {
        this.showMessage('Failed to connect Primary database.', 'error');
      }
    });
}


  onCancelClick() {
    this.databaseForm.reset();
    this.primaryClassMap = {};
    this.clientClassMap = {};
  }

  // ✅ MESSAGE BOX FUNCTIONS
  showMessage(text: string, type: 'success' | 'error') {
    this.messageBox.text = text;
    this.messageBox.type = type;
    this.messageBox.visible = true;
  }

  closeMessageBox() {
    this.messageBox.visible = false;

    // ✅ ✅ NAVIGATE ONLY AFTER USER CLICKS OK
    if (this.navigateAfterSuccess) {
      this.navigateAfterSuccess = false;

      this.router.navigate(['/table'], {
        queryParams: {
          primary: 'testdb',
          client: this.databaseForm.value.database
        }
      });
    }
  }
}