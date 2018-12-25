import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartService {

	constructor(private http: HttpClient) { }

  private url:string = environment.API_URL;

  loadCart(username) {
    return this.http.get(this.url + "/api/v1/cart/user/" + username);
  }
  

}
