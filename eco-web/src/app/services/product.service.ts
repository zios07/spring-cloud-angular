import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CartDto } from '../dto/cartDto';


@Injectable()
export class ProductService {

    url: string = environment.API_URL;

    constructor(private http: HttpClient) { }

    loadProducts(page, size) {
        return this.http.get(this.url + '/api/v1/products?page=' + page + '&size=' + size);
    }

    getProduct(id) {
        return this.http.get(this.url + '/api/v1/products/' + id);
    }

    addProductToCart(product, username) {
        const dto = new CartDto(username, product);
        return this.http.put(this.url + '/api/v1/cart/product/add', dto);
    }

    minusProductFromCart(product, username) {
        const dto = new CartDto(username, product);
        return this.http.put(this.url + '/api/v1/cart/product/minus', dto);
    }

    deleteProductFromCart(product, username) {
        return this.http.delete(this.url + '/api/v1/cart/product/delete?productid=' + product.id + '&username=' + username);
    }

    search(dto, page, size) {
        return this.http.post(this.url + '/api/v1/products/search?page=' + page + '&size=' + size, dto);
    }

    save(product, photos) {
        const fd = new FormData();
        fd.append('product',
            new Blob([JSON.stringify(product)], {
                type: 'application/json'
            }));
        for (let i = 0; i < photos.length; i++) {
            const blob = new Blob([photos[i]], { type: 'application/json' });
            fd.append('attachments', blob, photos[i].name);
        }
        return this.http.post(this.url + '/api/v1/products', fd);
    }

    deleteProduct(id) {
        return this.http.delete(this.url + '/api/v1/products/' + id);
    }
}
