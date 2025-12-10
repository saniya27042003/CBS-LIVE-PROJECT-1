import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // or .scss
})
export class ProfileComponent {

  constructor(private router: Router) {}

  onLogout() {
    // ✅ Remove tables state so selected tables & DB info are cleared
    sessionStorage.removeItem('tablesComponentState');
    sessionStorage.clear();

    localStorage.removeItem('app-theme');
    document.documentElement.setAttribute('data-theme', 'dark');

  // Remove theme from page
  // document.documentElement.removeAttribute('data-theme');
    // (Optional) Clear everything if you want a full reset:
    // sessionStorage.clear();
    // localStorage.clear();

    // ✅ Navigate to login
    this.router.navigate(['/login']);
  }
}