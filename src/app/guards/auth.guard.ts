import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  const isLoggedIn = authService.isLoggedIn(); // Check if the user is logged in

  if (isLoggedIn) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};

export const registerLoginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  const isLoggedIn = authService.isLoggedIn(); // Check if the user is logged in

  if (isLoggedIn) {
    return router.createUrlTree(['/dashboard']);
  } else {
    return true;
  }
};