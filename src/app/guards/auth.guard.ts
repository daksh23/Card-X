import { inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate {
  
  private router:Router = inject(Router)
  private authenticationService:AuthenticationService = inject(AuthenticationService);
  private isLoggedIn: boolean = false;

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}