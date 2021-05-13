import { HttpEventType } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/_services/cart.service';
import { CityService } from 'src/app/_services/city.service';
import { CountryService } from 'src/app/_services/country.service';
import { OrderService } from 'src/app/_services/order.service';
import { ProvinceService } from 'src/app/_services/province.service';

@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout-main.component.html',
  styleUrls: ['./checkout-main.component.css']
})
export class CheckoutMainComponent implements OnInit {
  model: any = {};
  cart: any[] = [];
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  selectedDrpDowns = {
    country : "0",
    provice: "0",
    city: "0"
  }

  orderSuccess: false;
  openPayment = false;


  SubTotal = 0;
  shipDis = 0;
  estTax = 0;
  EstTot = 0;

  constructor(public cartService: CartService, private orderService: OrderService, private toastr: ToastrService
    , private cityService: CityService, private provinceService: ProvinceService, private countryService: CountryService
    , private route: Router) { }

  ngOnInit(): void {
    this.loadDrpDwns();
    this.loadCart();
  }

  loadCart() {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
      this.SubTotal = this.cart.reduce((pre, acc) => pre + (acc.cartQty * acc.productPrice), 0)
      if(this.SubTotal > 35) this.shipDis = 5.99;

      this.estTax = (this.SubTotal * 0.13);
      this.EstTot = (this.SubTotal * 1.13) - this.shipDis;
    })
  }

  loadDrpDwns() {
    if(localStorage.getItem('user')) this.model.appUserId = JSON.parse(localStorage.getItem('user')).id;
    if(localStorage.getItem('guestUser')) this.model.emailAddress = localStorage.getItem('guestUser');
    this.countryService.GetAll().subscribe(countries => this.countries = countries);
    this.provinceService.GetAll().subscribe(provinces => this.provinces = provinces);
    this.cityService.GetAll().subscribe(cities => this.cities = cities);
  }

  onSubmitForm() {
    
    if(this.model.firstName !== "" && this.model.lastName !== "" && this.model.emailAddress !== ""
    && this.model.phoneNumber !== "" && this.model.postalCode !== "" && this.model.street !==""
    && this.selectedDrpDowns.city !== "0" && this.selectedDrpDowns.provice !== "0" 
    && this.selectedDrpDowns.country !== "0")
    {
      this.model.userType = "Guest User"
      if(this.model.appUserId) this.model.userType = "App User"; 
      this.openPayment = true;
      } else {
        this.toastr.warning("Please enter all fields to proceed!");
      }
    
  }

  makeOrderDetails(res: any) {
    this.cart.forEach(item => {
      const orderDetails = {
        orderId: res.id,
        productId: item.id,
        cartQty: item.cartQty,
        productPrice: item.productPrice
      }
      this.orderService.saveOrderDetails(orderDetails).subscribe(response => console.log(response));
    })
  }

  onpayment(event) {
    console.log(event);

    if(event.status == "Approved") {
      const contactDetails = {
        street : this.model.street,
        city: this.selectedDrpDowns.city,
        postalcode: this.model.postalCode,
        province: this.selectedDrpDowns.provice,
        country: this.selectedDrpDowns.country,
        emailAddress: this.model.emailAddress,
        phoneNumber: this.model.phoneNumber
      }
  
      const order = {
        userType: this.model.userType,
        contactDetails: contactDetails,
        orderStatus: "Order Confirmed"
      }

      console.log(order);
      
      
      try {
        // this.orderService.saveOrder(order).subscribe(response => {
        //   //console.log(response);
        //   this.makeOrderDetails(response);
        //   this.cartService.cartEmpty();
        //   this.route.navigateByUrl('/orderConfirm');
        // });
        
      } catch (error) {
        this.toastr.error(error);
      }

    } else {
      this.toastr.error("Something Wrong with payment!");
    }
    

//     nonce: "tokencc_bd_rt6696_z8snvc_xs9vy7_dn7w82_by2"
// status: "Approved"
  }
}
