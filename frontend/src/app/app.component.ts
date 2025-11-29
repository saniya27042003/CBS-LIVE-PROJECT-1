// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { RouterLink } from "@angular/router";

// @Component({
//   selector: 'app-root',
//   imports: [CommonModule, RouterLink, RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {

// }
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Add this for standalone component
  imports: [CommonModule, RouterOutlet], // ✅ Removed RouterLink (not used in template)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Correct key: "styleUrls" (plural)
})
export class AppComponent { }

