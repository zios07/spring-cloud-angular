import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private keycloakService: KeycloakService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const userRoles = this.keycloakService.getUserRoles();
    if (userRoles.indexOf('ADMIN') > -1) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
