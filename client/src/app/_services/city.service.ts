import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City } from '../_models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<City[]>(this.baseUrl + 'city');
  }

  Update(city) {
    return this.http.put(this.baseUrl + 'city/city', city);
  }

  Insert(city) {
    return this.http.post(this.baseUrl + 'city/city', city);
  }

  Remove(id) {
    return this.http.delete(this.baseUrl + `city/${id}`);
  }
}
