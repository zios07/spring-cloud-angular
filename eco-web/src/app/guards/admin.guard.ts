import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AdminGuard implements CanActivate {
    
  constructor(private authenticationService:AuthenticationService, private router:Router) { }
  
  ADMIN_ROLE: string = "ADMINISTRATOR";

  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      let activate = false;
      let jwtHelper = new JwtHelper();
      var token = localStorage.getItem('token');
      var decodedToken = jwtHelper.decodeToken(token);
      if(decodedToken.role && decodedToken.role === this.ADMIN_ROLE)
        return true;
      this.router.navigate(['']);
      return false;
  }
}
