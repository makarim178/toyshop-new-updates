import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any = [];

  contactDetail: any = {};
  

  constructor(private adminService: AdminService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders () {
    this.adminService.getOrders().subscribe(orders => {
      console.log(orders);
      
      this.orders = orders;
      //this.selectedStatus = orders.orderStatus;
      
    })
  }

  updateOrderStatus(order) {
    this.adminService.updateOrder(order).subscribe(() => {
      this.toastr.success("order updated!");
    });
  }

  
}
