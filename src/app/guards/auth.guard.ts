import { inject, Injectable, OnInit } from '@angular/core';
import {CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
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
