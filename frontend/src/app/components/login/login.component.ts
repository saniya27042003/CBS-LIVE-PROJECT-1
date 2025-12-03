import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  loginError: string = '';
  // Removed isLoading property since the delay/async operation was removed.

  // Teal/Turquoise Color: #00A99A

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    // 1. REMOVED default email value
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.loginError = '';
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // 2. REMOVED setTimeout (synchronous mock authentication now)
    if (password === '123456789') {
      console.log('Login successful:', email);
      this.router.navigate(['/database']);
    } else {
      // 3. Updated logic to set loginError immediately
      this.loginError =
        'Invalid credentials! Please check your username and password.';
      // Mark controls for immediate visual feedback on error
      this.loginForm.controls['email'].markAsTouched();
      this.loginForm.controls['password'].markAsTouched();
    }
  }
}
