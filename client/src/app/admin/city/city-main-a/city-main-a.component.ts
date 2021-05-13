import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CityService } from 'src/app/_services/city.service';

@Component({
  selector: 'app-city-main-a',
  templateUrl: './city-main-a.component.html',
  styleUrls: ['./city-main-a.component.css']
})
export class CityMainAComponent implements OnInit {

  allcities;
  id;
  cityname;
  formFor="";
  threeStates = ["none","insert","update","view"]

  public cancelForm(todo) {
    if(todo == 'Cancel') {
      this.cityname = "";
      this.formFor = this.threeStates[0];
    }
    
    this.loadcity();
  }

  constructor(private cityService: CityService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cityname = "";
    this.formFor = this.threeStates[0];
    this.loadcity()
  }

  click_addNew() {
    this.cityname = "";
    this.formFor = this.threeStates[1];
  }

  loadcity() {
    this.cityService.GetAll().subscribe(cities => {
      // console.log(cities);
      
      this.allcities = cities;
    })
  }

  loadUpdate(city) {
    //console.log(city);
    
    this.id = city.id;
    this.cityname = city.cityname;
    this.formFor=this.threeStates[2];
  } 

}
