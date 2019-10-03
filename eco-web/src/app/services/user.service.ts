import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post(this.url + '/api/v1/users/register', user);
  }

  loadUsers(page, size) {
    return this.http.get(this.url + '/api/v1/users?page=' + page + '&size=' + size);
  }

  deleteUser(id) {
    return this.http.delete(this.url + '/api/v1/users/' + id);
  }

  findById(id) {
    return this.http.get(this.url + '/api/v1/users/' + id);
  }

}
