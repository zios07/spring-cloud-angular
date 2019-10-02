import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BrandService {

	url: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	loadBrands() {
		return this.http.get(this.url + '/api/v1/brand');
	}

	saveBrand(brand) {
		return this.http.post(this.url + '/api/v1/brand', brand);
	}

	deleteBrand(id) {
		return this.http.delete(this.url + '/api/v1/brand/' + id);
	}

	getBrand(id) {
		return this.http.get(this.url + '/api/v1/brand/' + id);
	}
}
