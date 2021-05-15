import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactDetail } from 'src/app/_models/contactDetail';
import { UserUpdateSend } from 'src/app/_models/userUpdateSend';
import { AccountService } from 'src/app/_services/account.service';
import { CityService } from 'src/app/_services/city.service';
import { CountryService } from 'src/app/_services/country.service';
import { ProvinceService } from 'src/app/_services/province.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  showDob = false;

  
  provinces: any[] = [];
  provinceName;
  
  countries: any[] = [];
  countryName;
  cities: any[] = [];
  cityName;

  userDetails: any  = {
    userName:"",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactDetailId: "",
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

  year = [];
  month = [
    {
      "value": "01",
      "name": "January"
    },
    {
      "value": "02",
      "name": "February"
    },
    {
      "value": "03",
      "name": "March"
    },
    {
      "value": "04",
      "name": "April"
    },
    {
      "value": "05",
      "name": "May"
    },
    {
      "value": "06",
      "name": "June"
    },
    {
      "value": "07",
      "name": "July"
    },
    {
      "value": "08",
      "name": "August"
    },
    {
      "value": "09",
      "name": "September"
    },
    {
      "value": "10",
      "name": "October"
    },
    {
      "value": "11",
      "name": "November"
    },
    {
      "value": "12",
      "name": "December"
    }
  ]

  day = [];

  dob  = {
    "year": "2000",
    "month": "01",
    "day": "01"
  }
  constructor(private cityService: CityService, private provService: ProvinceService
      , private countryService: CountryService, private accountService: AccountService
      , private toastr: ToastrService) { }

  ngOnInit(): void {

    this.fillYear();
    this.fillDays();
    this.loadCity();
    this.loadProvince();
    this.loadCountry();
    this.loadUserDetails();
  }

  loadUserDetails () {

    if(localStorage.getItem('user')) {

      var userId = JSON.parse(localStorage.getItem('user')).id;
      
      this.accountService.getUserDetail(userId).subscribe(user => {
        
        if(user.contactDetail.city !== null && user.contactDetail.city !== undefined) this.cityName = user.contactDetail.city
        if(user.contactDetail.country !== null && user.contactDetail.country !== undefined) this.countryName = user.contactDetail.country
        if(user.contactDetail.province !== null && user.contactDetail.province !== undefined) this.provinceName = user.contactDetail.province
        

        const contactDetail: ContactDetail = {
          id: (user.contactDetail) ? user.contactDetail.id : 0,
          street: (user.contactDetail) ? user.contactDetail.street : "",
          city: (user.contactDetail) ? this.cityName: "",
          postalCode: (user.contactDetail) ? user.contactDetail.postalCode : "",
          province: (user.contactDetail) ? this.provinceName : "",
          country: (user.contactDetail) ? this.countryName : "",
          emailAddress: (user.contactDetail) ? user.contactDetail.emailAddress : "",
          phoneNumber: (user.contactDetail) ? user.contactDetail.phoneNumber : ""
        };

        this.userDetails  = {
          userName:user.username,
          firstName: (user.firstName) ? user.firstName : "",
          lastName: (user.lastName) ? user.lastName : "",
          dateOfBirth: this.dob.year + "-"+ this.dob.month + "-" + this.dob.day,
          contactDetailId: user.contactDetailId,
          contactDetail: contactDetail
        };         
      })

    }

  }

  loadCity() {
    this.cityService.GetAll().subscribe(cities => {
      
      this.cities = cities;
    })
  }

  loadProvince() {
    this.provService.GetAll().subscribe(provinces => {
      
      this.provinces = provinces;
      
    })
  }
  
  loadCountry() {
    this.countryService.GetAll().subscribe(countries => {
      this.countries =  countries;
    })
  }

  fillDays() {
    for(let i = 1; i <= 31; i++) {
      var d = i.toString();

      if(i < 10) d = '0' + i.toString();
      this.day.push(d);
    }
  }

  fillYear() {
    var yearStart = new Date().getFullYear() - 18;
    var yearEnd = yearStart - 100;

    for(var s = yearStart; s> yearEnd; s--) {
      var years = {
        "val": s.toString(),
        "name": s.toString()
      }
      
      this.year.push(years);
    }

  }

  UpdateUp() {
    if(this.userDetails.firstName !== "" && this.userDetails.lastName !== "" && this.userDetails.contactDetail.street !== "" 
      && this.cityName!== "" && this.provinceName !== "" && this.userDetails.contactDetail.postalCode !== "" 
      && this.countryName !== "" && this.userDetails.contactDetail.emailAddress !== "" && this.userDetails.contactDetail.phoneNumber !== "" 
    )
    {

      this.userDetails.contactDetail.city = this.cityName;
      this.userDetails.contactDetail.country = this.countryName;
      this.userDetails.contactDetail.province = this.provinceName;

      //console.log(this.userDetails.contactDetail.province );
      //contactDetailId;

      const sendData = {
        username: this.userDetails.userName,
        dateOfBirth: this.userDetails.dateOfBirth,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        contactDetailId: this.userDetails.contactDetailId,
        contactDetail: {
          city: this.userDetails.contactDetail.city,
          country: this.userDetails.contactDetail.country,
          emailAddress: this.userDetails.contactDetail.emailAddress,
          id: this.userDetails.contactDetail.id,
          phoneNumber: this.userDetails.contactDetail.phoneNumber,
          postalCode: this.userDetails.contactDetail.postalCode,
          province: this.userDetails.contactDetail.province,
          street: this.userDetails.contactDetail.street,
        }
      }
      

      this.accountService.updateUser(sendData).subscribe(() => {
        this.toastr.success("Updated Successfully!");
        this.loadUserDetails();
      });
      
      
    }
    else {
      this.toastr.warning("Please fill the details first!")
      
    }
  }

}
