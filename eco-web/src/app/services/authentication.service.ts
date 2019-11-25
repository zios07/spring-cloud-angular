import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    private url: string = environment.API_URL;
    jwtHelper: JwtHelperService = new JwtHelperService();
    token: String;

    constructor(private http: HttpClient,
        private keycloakService: KeycloakService, private router: Router) {
            this.getToken();
        }

    authenticate(credentials) {
        return this.http.post(this.url + '/api/v1/authentication/authenticate', credentials, { responseType: 'text' });
    }

    isLoggedIn() {
        return !this.keycloakService.isTokenExpired();
    }

    logout() {
        this.keycloakService.logout();
    }

    getConnectedUsername() {
        return localStorage.getItem('username');
    }

    isAdmin() {
        const userRoles = this.keycloakService.getUserRoles();
        return userRoles.indexOf('Admin');
    }


    private getToken() {
        return this.keycloakService.getToken().then(token => {
            this.token = token;
        }, error => {
            console.log(error);
        });
    }


	addAuthorizationHeader(request: HttpRequest<any>) {
        return this.getToken().then(token => {
            return request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + this.getToken())
            });
        }, error => {
            console.log(error);
        });
	}
}
