import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectedRouteActivatorService {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    return this.authService.isAuthenticated('proc').then((allow: boolean) => {
      if (!allow) {
        this.router.navigate(['/auth/login'], { queryParams: { redirect_url: state.url } });
      }
      return allow;
    });
  }
}

@Injectable()
export class LoginRouteActivator  {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.isAuthenticated('login').then((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigate(['']);
      }
      return false;
    });
  }
}