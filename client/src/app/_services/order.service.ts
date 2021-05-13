import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  saveOrder(order: any) {
    return this.http.post(this.baseUrl + 'orders/orders', order);
  }

  saveOrderDetails(orderdetails: any) {
    return this.http.post(this.baseUrl + 'orders/orderDetails', orderdetails);
  }
}
