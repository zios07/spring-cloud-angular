import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  ADMIN_ROLE = 'ADMINISTRATOR';

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const activate = false;
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    const decodedToken = jwtHelper.decodeToken(token);
    if (decodedToken.role && decodedToken.role === this.ADMIN_ROLE) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
