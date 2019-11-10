import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    private url: string = environment.API_URL;
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient,
        private keycloakService: KeycloakService, private router: Router) { }

    authenticate(credentials) {
        return this.http.post(this.url + '/api/v1/authentication/authenticate', credentials, { responseType: 'text' });
    }

    isLoggedIn() {
        return !this.keycloakService.isTokenExpired();
    }

    logout() {
        // localStorage.removeItem('token');
        // this.router.navigate(['/']);
        this.keycloakService.logout();
    }

    getConnectedUsername() {
        return localStorage.getItem('username');
    }

    isAdmin() {
        const userRoles = this.keycloakService.getUserRoles();
        return userRoles.indexOf('Admin');
    }


    async getToken() {
        return await this.keycloakService.getToken().then(token => {
            return token;
        }, error => {
            console.log(error);
        });
    }
}
