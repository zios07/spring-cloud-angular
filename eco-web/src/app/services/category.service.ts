import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

	constructor(private http: HttpClient) { }

  private url:string = environment.API_URL;

  loadCategories() {
    return this.http.get(this.url + "/api/v1/category")
      .map(response => response);
  }

  saveCategory(category) {
    return this.http.post(this.url + "/api/v1/category", category)
      .map(response => response);
  }

  deleteCategory(id) {
    return this.http.delete(this.url + "/api/v1/category/" + id )
      .map(response => response);
  }

  getCategory(id) {
    return this.http.get(this.url + "/api/v1/category/" + id)
      .map(response => response);
  }

}
