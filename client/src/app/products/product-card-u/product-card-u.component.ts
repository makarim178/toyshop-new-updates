import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { reduce } from 'rxjs/operators';


import { Product } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';


@Component({
  selector: 'app-product-card-u',
  templateUrl: './product-card-u.component.html',
  styleUrls: ['./product-card-u.component.css']
})
export class ProductCardUComponent implements OnInit {
  @Input() product: Product;
  products = [];
  cartTot = 0;

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
    // this.cartService.cart$.subscribe(response => {
    //   this.products = response;
    // });

    // console.log(this.products);
    

    // this.cartTot = this.products.reduce((acc,curr) => acc + curr.cartQty, 0)

    // console.log(`cart Qty: ${this.cartTot}`);
    
  }

  removeFromCart(id) {

    this.cartService.removeFromCart(id);
  }

}
