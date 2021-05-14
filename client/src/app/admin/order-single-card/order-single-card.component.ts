import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-order-single-card',
  templateUrl: './order-single-card.component.html',
  styleUrls: ['./order-single-card.component.css']
})
export class OrderSingleCardComponent implements OnInit {

  @Input() order;
  @Output() public editEmitter = new EventEmitter();

  selectedStatus="0";

  status = [
    {"value": "Order Confirmed"}, 
    {"value": "Order Proccessed"}, 
    {"value": "Order Shipped"}, 
    {"value": "Order Delivered"}, 
  ]

  contactDetails: any = {};
  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  

  ngOnInit(): void {
    this.selectedStatus = this.order.orderStatus;
    this.loadContactDetails();
  }

  loadContactDetails() {
    this.adminService.getContactDetails(this.order.contactDetailId).subscribe(cd => {
      console.log(cd);
      
      this.contactDetails = cd;
      
      
    })

  }

  updateOrderStatus(id){
    const order = {
      "id": id,
      "orderStatus": this.selectedStatus
    };

    this.editEmitter.emit(order);
    
  }

}
