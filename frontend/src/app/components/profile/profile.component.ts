import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  name: string = 'User Name';
  username: string = '@username';
  picture: string = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';

   private userSub!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

 ngOnInit(): void {
  // Subscribe to AuthService user$ to reactively update profile
  this.userSub = this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.name = user.name || this.name;
        this.username = user.email ? '@' + user.email.split('@')[0] : this.username;
        this.picture = user.picture || this.picture;
      } else {
        // Reset to default values if no user
        this.name = 'User Name';
        this.username = '@username';
        this.picture = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
      }
  });
}

 ngOnDestroy(): void {
    // Prevent memory leaks
    this.userSub.unsubscribe();
  }

  onLogout(): void {
      // Clear auth info and any session state
    this.authService.logout(); // clears user$ and localStorage
    // Clear session + auth info
    sessionStorage.removeItem('tablesComponentState');
<<<<<<< Updated upstream
    sessionStorage.clear();

    localStorage.removeItem('app-theme');
    document.documentElement.setAttribute('data-theme', 'dark');

  // Remove theme from page
  // document.documentElement.removeAttribute('data-theme');
    // (Optional) Clear everything if you want a full reset:
    // sessionStorage.clear();
    // localStorage.clear();

    // ✅ Navigate to login
=======
    //localStorage.removeItem('auth_user');
    //localStorage.removeItem('app_token');

>>>>>>> Stashed changes
    this.router.navigate(['/login']);
  }
}
