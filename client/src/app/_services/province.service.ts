import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Province } from '../_models/province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Province[]>(this.baseUrl + 'province');
  }

  Update(province) {
    return this.http.put(this.baseUrl + 'province/province', province);
  }

  Insert(province) {
    return this.http.post(this.baseUrl + 'province/province', province);
  }

  Remove(id) {
    return this.http.delete(this.baseUrl + `province/${id}`);
  }
}
