import { Injectable } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  
  url: string = environment.API_URL;

  constructor(private http: Http, private httpClient: HttpClient) { }

  registerUser(user) {
    return this.http.post(this.url + "/api/v1/users/register" , user);
  }

  loadUsers(page, size) {
    return this.httpClient.get(this.url + "/api/v1/users?page=" + page + "&size=" + size);
  }

  deleteUser(id) {
    return this.httpClient.delete(this.url + "/api/v1/users/" + id);
  }

  findById(id) {
    return this.httpClient.get(this.url + "/api/v1/users/" + id);
  }

}
