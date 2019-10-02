import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  private url: string = environment.API_URL;

  loadCategories() {
    return this.http.get(this.url + '/api/v1/category');
  }

  saveCategory(category) {
    return this.http.post(this.url + '/api/v1/category', category);
  }

  deleteCategory(id) {
    return this.http.delete(this.url + '/api/v1/category/' + id);
  }

  getCategory(id) {
    return this.http.get(this.url + '/api/v1/category/' + id);
  }

}
