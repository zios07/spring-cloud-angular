import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";
import { environment } from '../../environments/environment';

@Injectable()
export class BrandService {

	url: string = environment.API_URL;

	constructor(private http: HttpClient) { }

  	loadBrands() {
	  	return this.http.get(this.url + "/api/v1/brand")
		  	.map(response => response);
  	}

	saveBrand(brand) {
		return this.http.post(this.url + "/api/v1/brand", brand)
			.map(response => response);
	}

	deleteBrand(id) {
		return this.http.delete(this.url + "/api/v1/brand/" + id )
			.map(response => response);
	}

	getBrand(id) {
		return this.http.get(this.url + "/api/v1/brand/" + id)
			.map(response => response);
	}
}
