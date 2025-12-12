import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule, RouterLink,ProfileComponent ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  title = 'personal-app';

  class1 = 'basis-2/28';
  class2 = 'basis-26/28';

  

  toggle() {
    if (this.class1 === 'basis-2/28') {
      this.class1 = 'basis-4/28';
      this.class2 = 'basis-24/28';
    }
    else {
      this.class1 = 'basis-2/28';
      this.class2 = 'basis-26/28';
    }
  }
  

  expanded: boolean = false;

  toggleSideba() {
    this.expanded = !this.expanded;
  }


  menuItems = [
    { icon: 'database', label: 'database', path: 'database' },
    { icon: 'table', label: 'Tables', path: 'table' },
    { icon: 'cog', label: 'Settings', path: 'setting' },

  ];
 constructor(private router: Router) {
  // If on login page → do NOT load layout
  this.router.events.subscribe(() => {
    const url = this.router.url;

    if (url.includes('/login')) {
      document.body.classList.add('hide-layout');
    } else {
      document.body.classList.remove('hide-layout');
    }
  });
}

  logout() {

    localStorage.clear();


    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
  }



}