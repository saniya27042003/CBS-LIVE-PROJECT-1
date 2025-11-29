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

  primaryDatabaseName: string = '';
  clientDatabaseName: string = '';

  databaseForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.databaseForm = this.fb.group({
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,20}$/)
        ]
      ],
      port: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      host: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)
        ]
      ],
      database: ['', Validators.required]
    });
  }

  // ✅ SELECT PRIMARY DATABASE
  selectPrimary(dbName: string) {
    this.selectedPrimary = dbName;
    this.primaryClassMap = {};
    this.primaryClassMap[dbName] = 'ring-4 ring-green-400';
    this.primaryDatabaseName = dbName;
  }

  // ✅ SELECT CLIENT DATABASE (FIXED)
selectClient(dbName: string) {
  // ✅ dbName is ONLY the engine label (Postgres)
  this.selectedClient = dbName;

  this.clientClassMap = {};
  this.clientClassMap[dbName] = 'ring-4 ring-green-400';

  // ✅ IMPORTANT: DO NOT TOUCH the database NAME here
  // User must type: chatdb in the input field

  // ✅ Only force DB ENGINE TYPE
  this.databaseForm.patchValue({
    type:dbName   // fixed engine
  });
}




  // ✅ CONNECT BOTH PRIMARY + CLIENT
 onOkClick() {
  if (this.databaseForm.invalid) {
    this.databaseForm.markAllAsTouched();
    alert('Please fill all required fields correctly.');
    return;
  }

const clientConfig = {
  type: 'postgres',
  host: this.databaseForm.value.host,
  port: this.databaseForm.value.port,
  username: this.databaseForm.value.username,
  password: this.databaseForm.value.password,

  // ✅ ONLY THIS FIELD defines the actual DB name (chatdb)
  database: this.databaseForm.value.database
};


  this.http.post('http://localhost:3000/database-mapping/connect-client', clientConfig)
    .subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('✅ Client Database Connected Successfully!');
          this.router.navigate(['/table'], {
            queryParams: {
              primary: 'testdb',
              client: this.clientDatabaseName
            }
          });
        } else {
          alert('Client connection failed: ' + res.message);
        }
      },
      error: (err) => {
        console.error('Client Connection error:', err);
        alert('❌ Failed to connect Client database.');
      }
    });
}



  // ✅ CANCEL
  onCancelClick() {
    this.databaseForm.reset();

    this.selectedPrimary = null;
    this.primaryClassMap = {};
    this.primaryDatabaseName = '';

    this.selectedClient = null;
    this.clientClassMap = {};
    this.clientDatabaseName = '';
  }
}
