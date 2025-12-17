import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';
  email = '';

  profilePic: string | null = null;
  initialLetter = '';

  isGoogleUser = false;

  // ⭐ NEW FLAG
  showImage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userData);

    this.username = user?.name || 'User';
    this.email = user?.email || '';

    this.profilePic = user?.picture || null;
    this.initialLetter = this.username.charAt(0).toUpperCase();

    // show image only if URL exists
    this.showImage = !!this.profilePic;

    this.isGoogleUser = localStorage.getItem('isGoogleUser') === '1';
  }

  // 🔥 CRITICAL FIX
  onImageError(): void {
    this.showImage = false; // fallback to initials
  }

  openGoogleAccount(): void {
    if (this.isGoogleUser) {
      window.open('https://myaccount.google.com', '_blank');
    }
  }

  onLogout(): void {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }
}