import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
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

  ngOnInit(): void {
    if (window.google) {
      google.accounts.id.disableAutoSelect();
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        localStorage.setItem('isGoogleUser', '1');
      } catch (e) {
        console.error('Failed to parse user:', user);
      }

      window.history.replaceState({}, '', '/login');
      setTimeout(() => this.router.navigate(['/database']), 100);
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

  onGoogleLogin() {
    window.location.href = 'http://localhost:3000/auth/google/login';
  }

  onSubmit(): void {
    this.loginError = '';

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isLoading = true;

    // USER 1: CCPL
    if (username === 'ccpl' && password === '1234') {
      localStorage.setItem('auth_token', 'logged_in');
      localStorage.setItem('isGoogleUser', '0');

      const user = {
        name: 'CCPL User',
        email: 'ccpl@gmail.com',
        role: 'user',
        picture: ''
      };

      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigateByUrl('/database');
      return;
    }

    // USER 2: ADMIN (NEW)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('auth_token', 'logged_in');
      localStorage.setItem('isGoogleUser', '0');

      const user = {
        name: 'Admin User',
        email: 'admin@gmail.com',
        role: 'admin',
        picture: ''
      };

      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigateByUrl('/database');
      return;
    }

    // INVALID
    this.loginError = 'Invalid credentials! Please check your username and password.';
    this.isLoading = false;
  }
}
