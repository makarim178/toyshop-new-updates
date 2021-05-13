import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { CartService } from './_services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users : any = {};
  model = {
    UserName : "mir",
    Password: "Pa$$w0rd"
  }

  constructor(private http: HttpClient, private accountService: AccountService, private cartService: CartService) {}

  ngOnInit() {
    //this.GetUsers();
    this.setCurrentUser();
    this.setCart();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  setCart() {
    if(localStorage.getItem('cart')) {
      this.cartService.setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }


  // GetUsers() {
    
  //   this.http.post('https://localhost:5001/api/account/login', this.model)
  //     .subscribe((response) => {
  //       console.log(response);
        
  //       this.users = response;
  //     }, error => console.log(error));
  // }
}
