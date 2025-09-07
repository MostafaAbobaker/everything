import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if(localStorage.getItem('everything-token')) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }

  } else {
    return false;
  }
};
