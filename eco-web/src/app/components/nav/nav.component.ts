import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, 
              public authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  // TODO: inject a service to work with

  onLogin(template: BsModalRef){
    // this.modalRef = this.modalService.show(template);
    this.router.navigate(['/login']);
  }

  onRegister(template: BsModalRef){
    // this.modalRef = this.modalService.show(template);
    this.router.navigate(['/register']);
  }

  closeLogin(){
    this.modalRef.hide();
  }

  closeRegistration(){
    this.modalRef.hide();
  }

  onLogout(form) {
    this.authService.logout();
  }
}
