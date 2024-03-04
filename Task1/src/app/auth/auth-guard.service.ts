import { Injectable } from '@angular/core';
// E:\Task\task\src\app\services\auth\auth-service.service.ts
import { AuthServiceService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthServiceService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isLoggedIn()) {
        return true;
      } else {
        localStorage.clear();
        this.router.navigate(['/']);
        return false;
      }
  }
}