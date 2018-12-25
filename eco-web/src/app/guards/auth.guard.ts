import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthenticationService } from './../services/authentication.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  canActivate(router: ActivatedRouteSnapshot,
              state: RouterStateSnapshot){
    let activate = false;
    let jwtHelper = new JwtHelper();
    var token = localStorage.getItem('token');
    if(token){
      activate = !jwtHelper.isTokenExpired(token);
    }
    
    if(activate)
      return activate;

    this.router.navigate(['/login'], {queryParams: {src: state.url}});
    return false;
  }
}
