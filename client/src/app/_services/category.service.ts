import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  Update(category) {
    return this.http.put(this.baseUrl + 'category/category', category);
  }

  Insert(category) {
    return this.http.post(this.baseUrl + 'category/category', category);
  }

  Remove(id) {
    return this.http.delete(this.baseUrl + `category/${id}`);
  }

}
