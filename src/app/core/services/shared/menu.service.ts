import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from '../../models/menu-item/menu-item';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [];
  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);

  constructor(private authService: AuthService, private sanitizer: DomSanitizer) {
    this.menuItems = [
      {
        path: '/dashboard',
        title: 'Dashboard',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
              </svg>`),
        isVisible: true
      },
      {
        path: '/foundations',
        title: 'Fundaciones',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 14.0585C5 13.0494 5 12.5448 5.22166 12.1141C5.44333 11.6833 5.8539 11.3901 6.67505 10.8035L10.8375 7.83034C11.3989 7.42938 11.6795 7.2289 12 7.2289C12.3205 7.2289 12.6011 7.42938 13.1625 7.83034L17.325 10.8035C18.1461 11.3901 18.5567 11.6833 18.7783 12.1141C19 12.5448 19 13.0494 19 14.0585V19C19 19.9428 19 20.4142 18.7071 20.7071C18.4142 21 17.9428 21 17 21H7C6.05719 21 5.58579 21 5.29289 20.7071C5 20.4142 5 19.9428 5 19V14.0585Z" fill="#7E869E" fill-opacity="0.25"/>
            <path d="M3 12.3866C3 12.6535 3 12.7869 3.0841 12.8281C3.16819 12.8692 3.27352 12.7873 3.48418 12.6234L10.7721 6.95502C11.362 6.49625 11.6569 6.26686 12 6.26686C12.3431 6.26686 12.638 6.49625 13.2279 6.95502L20.5158 12.6234C20.7265 12.7873 20.8318 12.8692 20.9159 12.8281C21 12.7869 21 12.6535 21 12.3866V11.9782C21 11.4978 21 11.2576 20.8983 11.0497C20.7966 10.8418 20.607 10.6944 20.2279 10.3995L13.2279 4.95502C12.638 4.49625 12.3431 4.26686 12 4.26686C11.6569 4.26686 11.362 4.49625 10.7721 4.95502L3.77212 10.3995C3.39295 10.6944 3.20337 10.8418 3.10168 11.0497C3 11.2576 3 11.4978 3 11.9782V12.3866Z" fill="#222222"/>
            <path d="M12.5 15H11.5C10.3954 15 9.5 15.8954 9.5 17V20.85C9.5 20.9328 9.56716 21 9.65 21H14.35C14.4328 21 14.5 20.9328 14.5 20.85V17C14.5 15.8954 13.6046 15 12.5 15Z" fill="#222222"/>
            <rect x="16" y="5" width="2" height="4" rx="0.5" fill="#222222"/>
          </svg>
          `),
        roles: ['USER']
      },
      {
        path: '/animals-reports',
        title: 'Reportes',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="3" width="11" height="13" rx="2" fill="#7E869E" fill-opacity="0.25"/>
              <path d="M9 7L13 7" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M9 15L12 15" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M9 11L15 11" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M19 11V9C19 6.17157 19 4.75736 18.1213 3.87868C17.2426 3 15.8284 3 13 3H11C8.17157 3 6.75736 3 5.87868 3.87868C5 4.75736 5 6.17157 5 9V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H12" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
              <circle cx="17.5" cy="17.5" r="2.5" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M21 21L19.5 19.5" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          `),
        roles: ['FOUNDATION']
      },
      {
        path: '/save-friend',
        title: 'Salvar un Amigo',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg class="w-5 h-5" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.79 432.46"><path d="M131.91,466.06c-6.45-1.92-13.16-3.23-19.31-5.85-24.91-10.6-42.11-35-42.12-62.14,0-17.91,3.66-34.87,13.32-49.6a171.39,171.39,0,0,1,31.61-36.38c13.2-11.33,24.44-25.07,35.75-38.41,10-11.8,18.33-25,28.49-36.68,12.9-14.79,26.92-29.05,47.33-32.82,27.28-5.05,52.75-.77,73.62,19A179.53,179.53,0,0,1,320.32,246c9.15,12.21,16.79,25.63,26.62,37.24s21.49,21.5,32.36,32.14c1.77,1.74,3.66,3.37,5.36,5.18,15.89,16.85,30.06,34.64,34.71,58.25,3.83,19.4,2.27,38-8.9,54.57s-27.55,26.77-47.21,31.33c-1.52.36-3,.88-4.5,1.33H337c-19.49-4.53-39-8.91-58.45-13.64-16-3.88-32.38-6.19-48.41-3.44-27,4.64-53.75,11.28-80.6,17.08Z" transform="translate(-0.15 -33.59)"/><path d="M.15,196.25a29,29,0,0,0,1.18-3.78c6.58-39.54,48.51-52.86,80.17-30.07,12.18,8.76,20,20.12,27.11,32.86,9.16,16.48,11.19,34,6.4,51.34-8.34,30.31-35.46,46.25-67.39,33-13-5.41-22.68-14.74-31.35-25.85-9-11.59-13-24.75-16.12-38.52Z" transform="translate(-0.15 -33.59)"/><path d="M266.34,124.43c.07-17.94,2.88-32.91,10.19-46.26,9.71-17.72,22.19-33.09,42.12-40.82,20.19-7.82,40.89-3.27,55.79,12.17,16.86,17.46,20.05,39,17.48,61.33-1.45,12.7-5.09,25.93-11.06,37.17-10.57,19.86-26,35.72-49.45,40.51-17,3.47-31.94-.54-44.8-12.85C271.1,160.82,266.67,142.19,266.34,124.43Z" transform="translate(-0.15 -33.59)"/><path d="M172.3,187.18c-18.35.15-33.12-8.42-44-21.69-20.6-25.06-28.95-53.93-20.63-86.26,7-27.39,30.14-46.18,55.49-43.89,8.47.77,17.7,3.47,24.72,8.11,29.51,19.48,40.06,48.54,38.57,82.68-.54,12.51-3.6,24.63-10.33,35.32C206,177.45,191.89,187.12,172.3,187.18Z" transform="translate(-0.15 -33.59)"/><path d="M427.09,156.15a29.57,29.57,0,0,0,3.89-1c37.63-15.49,71.54,13.51,68.81,53-1.05,15.19-6.65,28-13.86,41-9.32,16.72-23.33,27.83-40.86,33-30.61,9-58.86-5.79-64.5-40.4-2.31-14.14.58-27.44,5.53-40.86,5.17-14,14.4-24.45,24.61-34.51Z" transform="translate(-0.15 -33.59)"/></svg>`),
        roles: ['USER']
      }
    ];

    this.updateMenuVisibility();
    this.authService.currentUser$.subscribe(() => {
      this.updateMenuVisibility();
    });
  }

  private updateMenuVisibility(): void {
    const userRole = this.authService.getCurrentUserRole();
    const visibleItems = this.menuItems.map(item => ({
      ...item,
      isVisible: !item.roles || item.roles.includes(userRole)
    }));
    this.menuItemsSubject.next(visibleItems);
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItemsSubject.asObservable();
  }
}
