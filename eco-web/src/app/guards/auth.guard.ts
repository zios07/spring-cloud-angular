import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let activate = false;
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      activate = !jwtHelper.isTokenExpired(token);
    }
    if (activate) {
      return activate;
    }
    this.router.navigate(['/login'], { queryParams: { src: state.url } });
    return false;
  }
}
