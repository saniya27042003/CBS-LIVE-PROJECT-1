import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';
import { MappingSettingsService } from '../../service/mapping-settings.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  includeChildTables: boolean = false; // ✅ REQUIRED


  username = '';
  email = '';

  profilePic: string | null = null;
  initialLetter = '';

  isGoogleUser = false;

  showImage = false;

  // ⭐ ADMIN FLAGS
  isAdmin = false;
  adminCheckbox = false;

  constructor(private router: Router,
      private appService: AppService, // ✅ INJECT SERVICE
      private mappingSettings: MappingSettingsService

  ) {}



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

    this.showImage = !!this.profilePic;

    this.isGoogleUser = localStorage.getItem('isGoogleUser') === '1';

    // ⭐ CHECK ADMIN ROLE
    this.isAdmin = user?.role === 'admin';

    // ⭐ RESTORE CHECKBOX STATE
    // If user is admin, check if they enabled auto-mapping previously
    if (this.isAdmin) {
      this.adminCheckbox = localStorage.getItem('adminAutoMapEnabled') === 'true';
    }

    this.appService.getIncludeChildTables().subscribe(value => {
    this.includeChildTables = value;   // ✅ sync UI checkbox
  });
  }

selectedParentTable!: string;
// ✅ CHILD TABLE TOGGLE

onIncludeChildChange() {
  this.mappingSettings.setIncludeChildren(this.includeChildTables);
}



  onImageError(): void {
    this.showImage = false;
  }

  openGoogleAccount(): void {
    if (this.isGoogleUser) {
      window.open('https://myaccount.google.com', '_blank');
    }
  }

    onAdminCheckboxChange(event: Event): void {
    this.adminCheckbox = (event.target as HTMLInputElement).checked;
    console.log('Admin checkbox:', this.adminCheckbox);

    // ⭐ SAVE CHECKBOX STATE TO LOCAL STORAGE
    if (this.adminCheckbox) {
      localStorage.setItem('adminAutoMapEnabled', 'true');
    } else {
      localStorage.setItem('adminAutoMapEnabled', 'false');
    }
  }

  onLogout(): void {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
