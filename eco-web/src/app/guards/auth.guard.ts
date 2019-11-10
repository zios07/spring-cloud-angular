import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private keycloakService: KeycloakService) { }

  canActivate(router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const activate = !this.keycloakService.isTokenExpired();
    // const jwtHelper = new JwtHelperService();
    // const token = localStorage.getItem('token');
    // if (token) {
    //   activate = !jwtHelper.isTokenExpired(token);
    // }
    if (activate) {
      return activate;
    }
    this.router.navigate(['/login'], { queryParams: { src: state.url } });
    return false;
  }
}
