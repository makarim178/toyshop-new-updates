import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cart : any[] = [];
  SubTotal = 0;
  shipDis = 0;
  estTax = 0;
  EstTot = 0;
  constructor(public cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    this.loadCart()
  }
  
  loadCart() {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
      this.SubTotal = this.cart.reduce((pre, acc) => pre + (acc.cartQty * acc.productPrice), 0)
      if(this.SubTotal > 35) this.shipDis = 5.99;

      this.estTax = (this.SubTotal * 0.13);
      this.EstTot = (this.SubTotal * 1.13) - this.shipDis;
    });
  }

  procToCheckOut() {
    if(!JSON.parse(localStorage.getItem('user'))) 
    {
      this.route.navigateByUrl('/register');
    } else {
      this.route.navigateByUrl('/checkout');
    }
    
  }


}
