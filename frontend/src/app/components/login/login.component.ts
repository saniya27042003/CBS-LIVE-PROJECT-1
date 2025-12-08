import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {

    // ✅ USERNAME & PASSWORD setup
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
  console.log('Google login clicked');
  // Later you can integrate Firebase / OAuth here
}

  onSubmit(): void {
    this.loginError = '';

    const { username, password } = this.loginForm.value;

    // ✅ Validate immediately on click
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // ✅ INSTANT VERIFICATION (NO setTimeout)
    if (username === 'ccpl' && password === '1234') {
      console.log('Login successful:', username);
      this.isLoading = false;
      this.router.navigate(['/database']);
    } else {
      this.loginError = 'Invalid credentials! Please check your username and password.';
      this.isLoading = false;
      this.loginForm.controls['username'].markAsTouched();
      this.loginForm.controls['password'].markAsTouched();
    }
  }
}
