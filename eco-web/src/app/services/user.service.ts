import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  url: string = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  registerUser(user) {
    return this.httpClient.post(this.url + '/api/v1/users/register', user);
  }

  loadUsers(page, size) {
    return this.httpClient.get(this.url + '/api/v1/users?page=' + page + '&size=' + size);
  }

  deleteUser(id) {
    return this.httpClient.delete(this.url + '/api/v1/users/' + id);
  }

  findById(id) {
    return this.httpClient.get(this.url + '/api/v1/users/' + id);
  }

}
