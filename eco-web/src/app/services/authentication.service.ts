import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import { JwtHelper } from "angular2-jwt";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthenticationService {

    private url:string = environment.API_URL ;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http:Http, private router: Router){}

    authenticate(credentials){
        return this.http.post(this.url+'/api/v1/authentication/authenticate', credentials)
            .map(response => response);
    }

    isLoggedIn(){
        let jwtHelper = new JwtHelper();
        let token = localStorage.getItem('token');
        if(!token)
          return false;
        let isExpired = jwtHelper.isTokenExpired(token);
        return !isExpired;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    getConnectedUsername(){
        return localStorage.getItem('username');
    }

    isAdmin() {
        let token = localStorage.getItem('token');
        let decodedToken:any = this.jwtHelper.decodeToken(token);
        if(decodedToken.role && decodedToken.role.indexOf('ADMIN') > -1)
            return true;
        return false;
    }


    getToken() {
        return localStorage.getItem('token');
    }
}