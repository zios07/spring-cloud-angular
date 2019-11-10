import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  jwtHelper: JwtHelperService = new JwtHelperService();

  invalidLogin: boolean;
  constructor(private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  onLogin(credentials) {
    this.authService.authenticate(credentials).subscribe(token => {
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', credentials.username);
        const srcUrl = this.route.snapshot.queryParamMap.get('src');
        this.router.navigate([srcUrl || '/']);
      }
    }, error => {
      if (error.status === 400 || error.status === 401) {
        this.invalidLogin = true;
      }
    });

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
