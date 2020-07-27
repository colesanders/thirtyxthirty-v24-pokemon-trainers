import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginService.isAuthenticated$.pipe(
        tap(isAuthenticated => {
          if (isAuthenticated) {
            return true;
          }
          this.router.navigateByUrl('/login');
        })
      );
  }
  
}
