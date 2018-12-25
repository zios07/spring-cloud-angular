import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../domain/user';
import { Account } from '../../domain/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user :User = new User();
  confirmPWD: string = "";

  constructor(private userService: UserService,
              private router: Router, 
              private toastr: ToastrService) { }

  ngOnInit() {
    let account:Account = new Account();
    this.user.account = account;
  }

  public register(){
    if(this.user.account.password == this.confirmPWD) {
      this.userService.registerUser(this.user).subscribe((result: any) => {
        this.toastr.success("Registration success");
        this.router.navigate(['/login']);
      }, error => {
        this.toastr.error("Registration error");
      })
    }
  }

  // public cancelRegistration(){
  //   console.log('canceling registration');
  // }
}
