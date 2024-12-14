import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take } from 'rxjs/operators';

export const foundationUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user?.isFoundationUser) {
        return true;
      } else {
        console.log('No es una fundación');
        router.navigate(['/dashboard']);
        return false;
      }
    })
  );
};
