import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class RoleService {

  url:string = environment.API_URL;

  constructor(private http: HttpClient) { }

  loadRoles() {
    return this.http.get(this.url + "/api/v1/roles");
  }

}
