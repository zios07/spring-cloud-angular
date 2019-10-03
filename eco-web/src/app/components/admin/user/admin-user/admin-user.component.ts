import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../../domain/user';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

	page: number = 0;
	size: number = 2;
	items: User[] = [];
	itemsCount: number;

	constructor(private router: Router,
		private userService: UserService,
		private toastr: ToastrService) { }

  	ngOnInit() {
	  	this.loadUsers();
  	}

  	loadUsers() {
		this.userService.loadUsers(this.page, this.size).subscribe((result: any) => {
			this.initializeDataTable(result);
		}, error => {
			this.toastr.error(String(error));
		});
	}
	  
	deleteUser(id) {
		this.userService.deleteUser(id).subscribe((result: any) => {
			this.loadUsers();
			this.toastr.info('User deleted');
		}, error => {
			this.toastr.error(String(error));
		});
	}

	reloadItems(params) {
		// if(this.tableResource)
		// 	this.tableResource.query(params)
		// 		.then(items => this.items = items);
	}

	initializeDataTable(users: User[]) {
		// this.tableResource = new DataTableResource(users);
		// this.tableResource.query({offset: 0})
		// 	.then(items => this.items = items);
		// this.tableResource.count()
		// 	.then(count => this.itemsCount = count);
	}

}
