import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router, private ngZone: NgZone, private authService: AuthService) {
    // USERNAME & PASSWORD setup
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this.handleGoogleCallback();
}

handleGoogleCallback(): void {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    fetch('http://localhost:3000/auth/google-callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {

        this.ngZone.run(() => {
        this.authService.setUser(data.user);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/table']);
        });
      }
    })
    .catch(err => console.error('Google login error:', err));
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
onGoogleLogin(): void {
  console.log('Google login clicked');
  window.location.href = 'http://localhost:3000/auth/google-login';
}


  onSubmit(): void {
    this.loginError = '';

    const { username, password } = this.loginForm.value;

    // Validate immediately on click
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // INSTANT VERIFICATION (No setTimeout)
    if (username === 'ccpl' && password === '1234') {
  console.log('Login successful:', username);

  // ⭐ FIX: Tell app user is authenticated
  localStorage.setItem('auth_token', 'logged_in');

  this.isLoading = false;

  this.router.navigate(['/database'])
    .then(n => console.log('navigated =', n))
    .catch(err => console.error('nav error', err));

} else {
  console.warn('Login failed');
}
  }
}