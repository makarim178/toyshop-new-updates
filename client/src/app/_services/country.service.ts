import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Country } from '../_models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Country[]>(this.baseUrl + 'country');
  }

  Update(country) {
    return this.http.put(this.baseUrl + 'country/country', country);
  }

  Insert(country) {
    return this.http.post(this.baseUrl + 'country/country', country);
  }

  Remove(id) {
    return this.http.delete(this.baseUrl + `country/${id}`);
  }
}
