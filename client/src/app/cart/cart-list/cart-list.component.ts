import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cart : any[] = []

  constructor(public cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCart();
    
  }

  loadCart() {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;

    })
  }

  addToCart(prod){
    
    
    this.cartService.addToCart(prod);
  }

  removeFromCart(id) {

    this.cartService.removeFromCart(id);
  }

}
