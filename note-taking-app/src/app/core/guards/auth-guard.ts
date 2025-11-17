import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
 if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // 2. If we are on the BROWSER, do the real check.
  if (authService.isAuthenticated()) {
    return true;
  }

  // 3. Not authenticated => Redirect.
  router.navigate(['/auth/login']);
  return false;
};
