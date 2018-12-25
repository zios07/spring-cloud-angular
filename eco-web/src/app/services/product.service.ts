import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { AuthHttp } from 'angular2-jwt';
import "rxjs/add/operator/map";
import { CartDto } from "../dto/cartDto";
import { AuthenticationService } from "./authentication.service";
import { Product } from '../domain/product';
import { environment } from "../../environments/environment";
import { UUID } from 'angular2-uuid';

@Injectable()
export class ProductService {

    url: string = environment.API_URL;

    constructor(private http: HttpClient, 
                private authService: AuthenticationService) { }

    loadProducts(page, size) {
        return this.http.get(this.url + "/api/v1/products?page="+page+"&size="+size)
            .map((response: any) => response.content);
    }

    getProduct( id ) {
        return this.http.get(this.url + "/api/v1/products/"+id)    
            .map(response => response);
    }

    addProduct(product) {
        product.uuid = localStorage.getItem('uuid');
        return this.http.post(this.url + "/api/v1/products", product)
            .map(response => response);
    }

    addProductToCart(product, username) {
        let dto = new CartDto(username, product);
        return this.http.put(this.url + "/api/v1/cart/product/add", dto)
            .map(response => response);
    }

    minusProductFromCart(product, username) {
        let dto = new CartDto(username, product);
        return this.http.put(this.url + "/api/v1/cart/product/minus", dto)
            .map(response => response);
    }

    deleteProductFromCart(product, username) {
        return this.http.delete(this.url + "/api/v1/cart/product/delete?productid="+product.id+"&username="+username)
            .map(response => response);
    }

    search(dto, page, size) {
        return this.http.post(this.url + "/api/v1/products/search?page="+page+"&size="+size , dto)
            .map((response: any) => response.content);
    }

    uploadPhotos(photos) {
        let fd = new FormData();
        fd.append("uuid", localStorage.getItem("uuid"));
        for(let i = 0 ; i < photos.length ; i++ ) {
            var blob = new Blob([photos[i]], { type: "application/json"});
            fd.append('photos', blob , photos[i].name);
        }
        return this.http.post(this.url + "/api/v1/products/add/photo/upload", fd)
            .map(response => response);
    }

    deleteProduct(id) {
        return this.http.delete(this.url + "/api/v1/products/" + id)
    }
}