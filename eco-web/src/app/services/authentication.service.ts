import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    private url: string = environment.API_URL;
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router) { }

    authenticate(credentials) {
        return this.http.post(this.url + '/api/v1/authentication/authenticate', credentials, { responseType: 'text' });
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const isExpired = this.jwtHelper.isTokenExpired(token);
        return !isExpired;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    getConnectedUsername() {
        return localStorage.getItem('username');
    }

    isAdmin() {
        const token = localStorage.getItem('token');
        const decodedToken: any = this.jwtHelper.decodeToken(token);
        if (decodedToken.role && decodedToken.role.indexOf('ADMIN') > -1) {
            return true;
        }
        return false;
    }


    getToken() {
        return localStorage.getItem('token');
    }
}
