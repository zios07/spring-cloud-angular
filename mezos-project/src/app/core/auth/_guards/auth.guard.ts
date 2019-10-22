// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return null;
    }

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!this.authenticated) {
                this.keycloakAngular.login();
                return;
            }
            console.log('role restriction given at app-routing.module for this route', route.data.roles);
            console.log('User roles coming after login from keycloak :', this.roles);
            const requiredRoles = route.data.roles;
            let granted: boolean = false;
            if (!requiredRoles || requiredRoles.length === 0) {
                granted = true;
            } else {
                for (const requiredRole of requiredRoles) {
                    if (this.roles.indexOf(requiredRole) > -1) {
                        console.log('User role not allowed');
                        granted = true;
                        break;
                    }
                }
            }

            if (granted === false) {
                this.router.navigate(['/']);
            }
            resolve(granted);

        });
    }
}
