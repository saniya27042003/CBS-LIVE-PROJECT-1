import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse
} from '@angular/common/http';

interface StatusResponse {
  serverConnected: boolean;
  clientConnected: boolean;
}

interface DeleteResponse {
  success: boolean;
  message: string;
  processedCount: number;
  tables: string[];
}

@Component({
  selector: 'app-delete-sequence',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './delete-sequence.component.html',
  styleUrls: ['./delete-sequence.component.css']
})
export class DeleteSequenceComponent implements OnInit {

  private apiUrl = 'http://localhost:3000/db';

  // =========================
  // DATABASE FORM
  // =========================
  dbForm!: FormGroup;

  // =========================
  // FILE
  // =========================
  selectedFile: File | null = null;

  // =========================
  // UI STATE
  // =========================
  isLoading = false;

  serverConnected = false;
  clientConnected = false;

  // =========================
  // RESPONSE DATA
  // =========================
  feedbackMessage: string | null = null;

  feedbackType: 'success' | 'error' | 'info' = 'info';

  deletedTablesList: string[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    // =========================
    // FORM INIT
    // =========================
    this.dbForm = this.fb.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      database: ['', Validators.required]
    });

    this.checkDatabaseStatus();
  }

  // =========================
  // CONNECT DATABASE
  // =========================
  connectDatabase(): void {

  if (this.dbForm.invalid) {

    this.showFeedback(
      'Please fill all PostgreSQL credentials.',
      'error'
    );

    return;
  }

  this.isLoading = true;

  const payload = {
    host: this.dbForm.value.host,
    port: Number(this.dbForm.value.port),
    username: this.dbForm.value.username,
    password: this.dbForm.value.password,
    database: this.dbForm.value.database
  };

  this.http.post<any>(
    `${this.apiUrl}/connect-server`,
    payload
  ).subscribe({

    next: (res) => {

      this.isLoading = false;

      if (res.success) {

        // DATABASE CONNECTED
        this.serverConnected = true;

        this.showFeedback(
          'Database connected successfully.',
          'success'
        );

      } else {

        // CONNECTION FAILED
        this.serverConnected = false;

        this.showFeedback(
          'Database connection failed.',
          'error'
        );
      }
    },

    error: (err: HttpErrorResponse) => {

      this.isLoading = false;

      this.serverConnected = false;

      console.error(err);

      const errMsg =
        err.error?.message ||
        'Unable to connect PostgreSQL database.';

      this.showFeedback(
        errMsg,
        'error'
      );
    }
  });
}

  // =========================
  // STATUS CHECK
  // =========================
  checkDatabaseStatus(): void {

    this.http.post<StatusResponse>(
      `${this.apiUrl}/status`,
      {}
    ).subscribe({

      next: (status) => {

        this.serverConnected = status.serverConnected;

        this.clientConnected = status.clientConnected;
      },

      error: (error) => {

        console.error('Status check failed:', error);

        this.showFeedback(
          'Could not fetch backend connection status.',
          'error'
        );
      }
    });
  }

  // =========================
  // FILE SELECT
  // =========================
  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.validateAndSetFile(input.files[0]);
    }
  }

  // =========================
  // DRAG DROP
  // =========================
  onFileDropped(event: DragEvent): void {

    event.preventDefault();

    if (
      event.dataTransfer?.files &&
      event.dataTransfer.files.length > 0
    ) {
      this.validateAndSetFile(
        event.dataTransfer.files[0]
      );
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // =========================
  // FILE VALIDATION
  // =========================
  private validateAndSetFile(file: File): void {

    const name = file.name.toLowerCase();

    if (
      name.endsWith('.csv') ||
      name.endsWith('.xlsx')
    ) {

      this.selectedFile = file;

      this.clearFeedback();

    } else {

      this.selectedFile = null;

      this.showFeedback(
        'Invalid file format. Please upload .csv or .xlsx',
        'error'
      );
    }
  }

  // =========================
  // EXECUTE DELETE
  // =========================
  executeDeleteSequence(): void {

    if (!this.selectedFile) {

      this.showFeedback(
        'Please upload CSV/XLSX file first.',
        'error'
      );

      return;
    }

    if (!this.serverConnected) {

      this.showFeedback(
        'Please connect PostgreSQL database first.',
        'error'
      );

      return;
    }

    this.isLoading = true;

    this.clearFeedback();

    const formData = new FormData();

    formData.append('file', this.selectedFile);

    this.http.post<DeleteResponse>(
      `${this.apiUrl}/DeleteTable`,
      formData
    ).subscribe({

      next: (res) => {

        this.isLoading = false;

        if (res.success) {

          this.deletedTablesList = res.tables;

          this.showFeedback(
            `${res.message}. Processed ${res.processedCount} tables successfully.`,
            'success'
          );

          this.selectedFile = null;
        }
      },

      error: (err: HttpErrorResponse) => {

        this.isLoading = false;

        console.error(err);

        const errMsg =
          err.error?.message ||
          'Delete sequence execution failed.';

        this.showFeedback(errMsg, 'error');
      }
    });
  }

  // =========================
  // FEEDBACK
  // =========================
  private showFeedback(
    msg: string,
    type: 'success' | 'error' | 'info'
  ): void {

    this.feedbackMessage = msg;

    this.feedbackType = type;
  }

  private clearFeedback(): void {

    this.feedbackMessage = null;

    this.deletedTablesList = [];
  }
}
