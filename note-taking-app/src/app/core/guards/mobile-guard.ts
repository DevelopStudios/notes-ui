// src/app/core/guards/mobile.guard.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const mobileGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      router.navigate(['/dashboard']);
      return false;
    }
  }
  return true;
};