import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css']
})
export class CartMainComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  // loadCart() {
  //   this.cartList = JSON.parse(localStorage.getItem('cart'));
  // }

}
