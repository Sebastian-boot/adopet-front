import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkModeClass = 'dark';

  toggleDarkMode(): void {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains(this.darkModeClass)) {
      htmlElement.classList.remove(this.darkModeClass);
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.add(this.darkModeClass);
      localStorage.setItem('theme', 'dark');
    }
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add(this.darkModeClass);
    }
  }
}
