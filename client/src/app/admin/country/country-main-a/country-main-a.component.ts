import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-country-main-a',
  templateUrl: './country-main-a.component.html',
  styleUrls: ['./country-main-a.component.css']
})
export class CountryMainAComponent implements OnInit {

  allcountries;
  id;
  countryname;
  formFor="";
  threeStates = ["none","insert","update","view"]

  public cancelForm(todo) {
    if(todo == 'Cancel') {
      this.countryname = "";
      this.formFor = this.threeStates[0];
    }
    
    this.loadcountry();
  }

  constructor(private countryService: CountryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.countryname = "";
    this.formFor = this.threeStates[0];
    this.loadcountry()
  }

  click_addNew() {
    this.countryname = "";
    this.formFor = this.threeStates[1];
  }

  loadcountry() {
    this.countryService.GetAll().subscribe(countries => {
      // console.log(cities);
      
      this.allcountries = countries;
    })
  }

  loadUpdate(country) {
    //console.log(country);
    
    this.id = country.id;
    this.countryname = country.countryname;
    this.formFor=this.threeStates[2];
  }

}
