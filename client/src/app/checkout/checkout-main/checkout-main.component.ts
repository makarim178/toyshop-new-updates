import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactDetail } from 'src/app/_models/contactDetail';
import { UserUpdateSend } from 'src/app/_models/userUpdateSend';
import { AccountService } from 'src/app/_services/account.service';
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

  userDetails: UserUpdateSend  = {
    userName:"",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactDetail: {
      id: "",
      street: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      emailAddress: "",
      phoneNumber: ""
    }
  }; 

  orderSuccess: false;
  openPayment = false;

  orderDetails:any = [];


  SubTotal = 0;
  shipDis = 0;
  estTax = 0;
  EstTot = 0;

  constructor(public cartService: CartService, private orderService: OrderService, private toastr: ToastrService
    , private cityService: CityService, private provinceService: ProvinceService, private countryService: CountryService
    , private route: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadDrpDwns();
    this.loadCart();
    this.loadUserDetails();
  }

  loadUserDetails () {

    if(localStorage.getItem('user')) {

      var userId = JSON.parse(localStorage.getItem('user')).id;
      
      this.accountService.getUserDetail(userId).subscribe(user => {
        //console.log(user);

        // this.cityName = user.contactDetail.city ;
        // this.countryName = user.contactDetail.country;
        // this.provinceName = user.contactDetail.province;

        this.model.firstName = user.firstName;
        this.model.lastName = user.lastName;
        this.model.phoneNumber= user.contactDetail.phoneNumber;
        this.model.emailAddress= user.contactDetail.emailAddress;
        this.model.street= user.contactDetail.street;
        this.model.postalCode= user.contactDetail.postalCode;
        this.selectedDrpDowns.city= user.contactDetail.city;
        this.selectedDrpDowns.provice= user.contactDetail.province;
        this.selectedDrpDowns.country= user.contactDetail.country;
        //console.log(this.model.phoneNumber);
        
        

        const contactDetail: ContactDetail = {
          id: (user.contactDetail) ? user.contactDetail.id : 0,
          street: (user.contactDetail) ? user.contactDetail.street : "",
          city: (user.contactDetail) ? user.contactDetail.city : "",
          postalCode: (user.contactDetail) ? user.contactDetail.postalCode : "",
          province: (user.contactDetail) ? user.contactDetail.province : "",
          country: (user.contactDetail) ? user.contactDetail.country : "",
          emailAddress: (user.contactDetail) ? user.contactDetail.emailAddress : "",
          phoneNumber: (user.contactDetail) ? user.contactDetail.phoneNumber : ""
        };

        this.userDetails  = {
          userName:user.username,
          firstName: (user.firstName) ? user.firstName : "",
          lastName: (user.lastName) ? user.lastName : "",
          dateOfBirth: "",
          contactDetail: contactDetail
        };         
      })

    }

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
      


      this.cart.forEach(item => {
        const orderDetails = {
          productId: item.id,
          cartQty: item.cartQty,
          productPrice: item.productPrice
        }
        this.orderDetails.push(orderDetails);
      });
  
      const order = {
        usertype: this.model.userType,
        appUserId: 0,
        orderDetails: this.orderDetails,
        contactDetail: contactDetails,
        orderStatus: "Order Confirmed"
      }

      if(this.userDetails.userName != "") {
        order.appUserId = JSON.parse(localStorage.getItem('user')).id;
      }

      
      
      
      try {
        this.orderService.saveOrder(order).subscribe(response => {
          //console.log(response);
          //this.makeOrderDetails(response);
          this.cartService.cartEmpty();
          this.route.navigateByUrl('/orderConfirm');
        });
        
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
