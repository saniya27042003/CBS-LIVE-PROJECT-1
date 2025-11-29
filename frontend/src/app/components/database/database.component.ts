import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppService } from '../../../service/app.service';

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

  primaryDatabaseName = '';
  clientDatabaseName = '';

  databaseForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.databaseForm = this.fb.group({
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4)    // temporary simple rule
        ]
      ],
      port: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      host: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(localhost|127\.0\.0\.1)$/)   // only localhost for now
        ]
      ],
      database: ['', Validators.required]
    });
  }

  // SELECT PRIMARY DATABASE
  selectPrimary(dbName: string) {
    this.selectedPrimary = dbName;
    this.primaryClassMap = {};
    this.primaryClassMap[dbName] = 'ring-4 ring-green-400';
    this.primaryDatabaseName = dbName;
  }

  // SELECT CLIENT DATABASE – only sets engine type
  selectClient(dbName: string) {
    this.selectedClient = dbName;
    this.clientClassMap = {};
    this.clientClassMap[dbName] = 'ring-4 ring-green-400';
    this.clientDatabaseName = dbName;

    // force only the ENGINE type in the form
    this.databaseForm.patchValue({
      type: dbName
    });
  }
  onOkClick() {
    if (this.databaseForm.invalid) {
      this.databaseForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
      return;
    }

    const clientConfig = {
      type: this.databaseForm.value.type.toLowerCase(),  // 'Postgres' -> 'postgres'
      host: this.databaseForm.value.host,
      port: this.databaseForm.value.port,
      username: this.databaseForm.value.username,
      password: this.databaseForm.value.password,
      database: this.databaseForm.value.database
    };


    this.appService.connectClient(clientConfig).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('✅ Client Database Connected Successfully!');
          this.router.navigate(['/table'], {
            queryParams: {
              primary: this.selectedPrimary,
              clientType: this.selectedClient,
              client: this.databaseForm.value.database
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


  // CANCEL
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
