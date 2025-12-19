import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // ✅ HANDLE BACKEND GOOGLE REDIRECT TOKEN
  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', decodeURIComponent(user));

      this.router.navigate(['/database']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  resetForm(): void {
    this.loginForm.reset();
    this.loginError = '';
    this.showPassword = false;
  }

  // ✅ GOOGLE LOGIN — REDIRECT FLOW ONLY
  onGoogleLogin() {
    window.location.href = 'http://localhost:3000/auth/google/login';
  }

  // ✅ NORMAL USERNAME / PASSWORD LOGIN
  onSubmit(): void {
  this.loginError = '';

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { username, password } = this.loginForm.value;

  console.log('LOGIN ATTEMPT:', username, password); // ✅ Debug

  this.isLoading = true;

  if (username === 'ccpl' && password === '1234') {

    console.log('✅ LOGIN SUCCESS — NAVIGATING TO DATABASE');

    this.isLoading = false;

    const user = {
      name: 'CCPL User',
      email: 'ccpl@gmail.com',
      picture: ''
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'manual-login-token');

    // ✅✅✅ THIS IS THE ACTUAL REDIRECT
    this.router.navigateByUrl('/database');

  } else {

    console.log('❌ LOGIN FAILED');

    this.loginError = 'Invalid credentials! Please check your username and password.';
    this.isLoading = false;
  }
}
}