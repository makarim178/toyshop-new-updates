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

  userDetails: UserUpdateSend  = {
    userName:"admin",
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
        console.log(user);

        this.cityName = user.contactDetail.city ;
        this.countryName = user.contactDetail.country;
        this.provinceName = user.contactDetail.province;
        

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
          dateOfBirth: this.dob.year + "-"+ this.dob.month + "-" + this.dob.day,
          contactDetail: contactDetail
        };         
      })

    }

  }

  loadCity() {
    this.cityService.GetAll().subscribe(cities => {
      console.log(cities);
      
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
      && this.userDetails.contactDetail.city !== "" && this.userDetails.contactDetail.province !== "" && this.userDetails.contactDetail.postalCode !== "" 
      && this.userDetails.contactDetail.country !== "" && this.userDetails.contactDetail.emailAddress !== "" && this.userDetails.contactDetail.phoneNumber !== "" 
    )
    {
      this.accountService.updateUser(this.userDetails).subscribe(() => {
        this.toastr.success("Updated Successfully!");
        this.loadUserDetails();
      });
      
      
    }
    else {
      this.toastr.warning("Please fill the details first!")
      
    }
  }

}
