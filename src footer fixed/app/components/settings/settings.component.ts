import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css' // keep as you have it; if Angular complains change to styleUrls: [...]
})
export class SettingsComponent implements OnInit {

  themeListArray: string[] = [
    "light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro",
    "cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel",
    "fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business",
    "acid","lemonade","night","coffee","winter","dim","sunset"
  ];

  currentTheme: string = '';

  // key used in localStorage
  private readonly STORAGE_KEY = 'app-theme';

  ngOnInit(): void {
    // restore theme from localStorage if present, otherwise keep any existing page theme or choose a default
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.applyTheme(saved);
    } else {
      // optional: set a default theme on first load
      // const defaultTheme = 'dark';
      // this.applyTheme(defaultTheme);
      // if you don't want to force a default, leave commented out
      this.currentTheme = document.documentElement.getAttribute('data-theme') || '';
    }
  }

  // selectTheme(theme: string) {
  //   this.applyTheme(theme);
  //   // persist selection so it survives refresh / logout (unless you clear localStorage)
  //   localStorage.setItem(this.STORAGE_KEY, theme);
  // }

  private applyTheme(theme: string) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  // OPTIONAL: call this on logout if you want to clear saved theme
  clearSavedTheme() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  selectTheme(theme: string) {
  localStorage.setItem('app-theme', theme);
  sessionStorage.setItem('isLoggedIn', '1'); // VERY IMPORTANT
  document.documentElement.setAttribute('data-theme', theme);
}


}
