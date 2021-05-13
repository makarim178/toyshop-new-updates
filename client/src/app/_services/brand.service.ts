import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brand } from '../_models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAllBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'brand');
  }

  UpdateBrand(brand) {
    return this.http.put(this.baseUrl + 'brand/brand', brand);
  }

  InsertBrand(brand) {
    return this.http.post(this.baseUrl + 'brand/brand', brand);
  }

  RemoveBrand(id) {
    return this.http.delete(this.baseUrl + `brand/${id}`);
  }
}
