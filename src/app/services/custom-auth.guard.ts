import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';

export const customAuthGuard: CanActivateFn = (route, state) => {
  const oktaAuthStateService = inject(OktaAuthStateService);
  const router = inject(Router);
  let isAuthenticated = false;
  oktaAuthStateService.authState$.subscribe(authState => {
    isAuthenticated = authState.isAuthenticated;  
  });
  if(!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
