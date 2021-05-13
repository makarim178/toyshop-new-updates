import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  cartTotal = 0;
  cart = [];

  constructor(public accountService: AccountService, public cartService: CartService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCart();

    // this.cartService.cart$.subscribe(response => {
    //   this.products = response;
    // });

    // console.log(this.products);
    

    // this.cartTot = this.products.reduce((acc,curr) => acc + curr.cartQty, 0)

    // console.log(`cart Qty: ${this.cartTot}`);

  }

  loadCart() {
    this.cartService.cart$.subscribe(response => {
      this.cart = response;
    });

    if(this.cart.length > 0) {
      this.cartTotal = this.cart.reduce((acc, curr) => acc + curr.cartQty, 0);
    }
    
    
    
  }

  Logout() {
    this.accountService.Logout();
    this.toastr.success('Successfully Logged out!');
    this.route.navigateByUrl('/');
  }

}
