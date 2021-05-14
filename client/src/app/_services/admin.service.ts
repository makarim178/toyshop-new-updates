import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + `admin/edit-roles/${username}?roles=${roles}`, {});
  }

  getOrders() {
    return this.http.get(this.baseUrl + 'orders');
  }

  getContactDetails(id:any) {
    return this.http.get(this.baseUrl + `users/contactDetails/${id}`);
  }

  updateOrder(order) {
    return this.http.put(this.baseUrl + 'orders', order);
  }
}
