import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  
  const requiredRole = route.data?.['role'];
  if (!requiredRole || authService.hasRole(requiredRole)) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};
