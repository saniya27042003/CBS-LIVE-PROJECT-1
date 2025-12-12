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
  profilePic: string = '';
  defaultPic = 'https://www.gravatar.com/avatar/?d=mp&s=200'; // clean fallback

    isGoogleUser: boolean = false; // NEW FLAG

  constructor(private router: Router) {}

ngOnInit(): void {
  const userData = localStorage.getItem('user');

  if (userData) {
    const user = JSON.parse(userData);

    this.username = user?.name || 'User';
    this.email = user?.email || '';

    // ⭐ Fallback to REAL Google avatar if picture missing
   this.profilePic = user.picture
  ? user.picture
  : 'https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png';

   this.isGoogleUser = localStorage.getItem('isGoogleUser') === '1';
  } else {
    this.router.navigate(['/login']);
  }
}

openGoogleAccount() {
  if (this.isGoogleUser) {
    window.open('https://myaccount.google.com', '_blank');
  }
}



  // 🔥 STEP 3 — Broken images automatically fallback
  onImageError(event: any) {
    event.target.src = this.defaultPic;
  }

  onLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
