import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../../../domain/account';
import { Role } from '../../../../domain/role';
import { User } from '../../../../domain/user';
import { RoleService } from '../../../../services/role.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  roles: Role[] = [];
  // user = { account :{ username:'', password: ''}};
  user: User = new User();
  confirmPWD = '';

  constructor(private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.user.setAccount(new Account());
    this.loadRoles();
    this.loadUserToEdit();
  }

  register() {
    this.userService.registerUser(this.user).subscribe((result: any) => {
      this.toastr.success('User added successfully');
      this.router.navigate(['/admin/users']);
    }, error => {
      this.toastr.error('Error occured while creating the user');
    });
  }

  loadRoles() {
    this.roleService.loadRoles().subscribe((result: Role[]) => {
      this.roles = result;
    }, error => {
      this.toastr.error(String(error));
    });
  }

  loadUserToEdit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.findById(id).subscribe((result: User) => {
        this.user = result;
        console.log(this.user.bDate);
        // set selected role. Again, there has to be a better way to do this!
        if (this.roles) {
          const p = this.user;
          let match;
          this.roles.forEach(function (br) {
            if (br.id === p.role.id) {
              match = br;
            }
          });
          this.user.role = match;
        }
      }, error => {
        this.toastr.error(String(error));
      });
    }
  }

}
