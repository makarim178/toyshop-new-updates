import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private currentCartSource = new ReplaySubject<Product[]>(1);
  private cartTot = new ReplaySubject<number>(1);
  cart$ = this.currentCartSource.asObservable();
  cartTotal$ = this.cartTot.asObservable();


  constructor(private toastr: ToastrService) { }

  setCart(products :any[]) {

    let noInCart = products.reduce((acc, curr) => acc + curr.cartQty, 0)
    this.cartTot.next(noInCart);
    this.currentCartSource.next(products);
  }

  addToCart(prod: any){   
    
    // new in cart
    if(localStorage.getItem('cart') === null) {
      let newCart = [];
      if(prod.availableQty > 0) {
        prod.cartQty = 1;
        prod.availableQty--;
      }
      newCart.push(prod);
      localStorage.setItem('cart', JSON.stringify(newCart));
      this.currentCartSource.next(newCart);
      this.cartTot.next(1);
      this.toastr.success("Item added in cart!");
    } 
    else 
    {
      
      let cartT = JSON.parse(localStorage.getItem('cart'));
      let exists = false;
      

      cartT = cartT.map((product) => {
        
        
        if(product.id.toString() === prod.id.toString()) {
          product.cartQty++; 
          product.availableQty--;
          exists = true;
        }
        return product;
      });

      //console.log(`exists : ${exists}`);
      
      if(!exists) {
        prod.cartQty = 1;
        cartT.push(prod);
      }
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(cartT));
      
      const noInCart = cartT.reduce((acc, curr) => acc + curr.cartQty, 0);
      
      this.cartTot.next(noInCart);
      this.currentCartSource.next(cartT);

      if(exists) {
        this.toastr.success("Item quantity added by 1 in cart!");
      } else {
        this.toastr.success("Item added in cart!");
      }
    }
  }

  cartEmpty() {
    if(localStorage.getItem('cart')) localStorage.removeItem('cart');
    this.currentCartSource.next(null);
    this.cartTot.next(0);
  }


  removeFromCart(id) {
    // if cart empty
    if(localStorage.getItem('cart') === null) {
      this.toastr.warning("Cart is Empty, please add an item in cart first");
    } else { // cart not empty to remove
      let cart = JSON.parse(localStorage.getItem('cart'));
      let exists = false;
      let removeFromCart = false;
      cart = cart.map((product) => {
        if(product.id == id && product.cartQty > 0) {
          product.cartQty--; 
          product.availableQty++;
          exists = true;
          if(product.cartQty == 0) removeFromCart = true;
        }
        return product;
      });

      if(exists){
        // if product already exists in cart
        if(removeFromCart) {
          cart = cart.filter((product) => {
            return product.id !== id
          })
        }
        // this.currentCartSource.next(null);
        // this.cartTot.next(0);
        if(cart.length > 0) 
        {          
          localStorage.removeItem('cart');
          localStorage.setItem('cart', JSON.stringify(cart));
          this.toastr.warning("Item quantity reduced by 1 in cart!");
          this.currentCartSource.next(cart);
          this.cartTot.next(cart.reduce((acc, curr) => acc + curr.cartQty, 0));
        } else {
          localStorage.removeItem('cart');
          this.toastr.warning("Cart is Empty Now!");
          this.currentCartSource.next(null);
          this.cartTot.next(0);
        }
      } else {
        this.toastr.error("Item is not in Cart, Please add the item first");
      }
    }
  }
}
