import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProvinceService } from 'src/app/_services/province.service';

@Component({
  selector: 'app-province-main-a',
  templateUrl: './province-main-a.component.html',
  styleUrls: ['./province-main-a.component.css']
})
export class ProvinceMainAComponent implements OnInit {

  allprovinces;
  id;
  provincename;
  formFor="";
  threeStates = ["none","insert","update","view"]

  public cancelForm(todo) {
    if(todo == 'Cancel') {
      this.provincename = "";
      this.formFor = this.threeStates[0];
    }
    
    this.loadprovince();
  }

  constructor(private provinceService: ProvinceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.provincename = "";
    this.formFor = this.threeStates[0];
    this.loadprovince()
  }

  click_addNew() {
    this.provincename = "";
    this.formFor = this.threeStates[1];
  }

  loadprovince() {
    this.provinceService.GetAll().subscribe(provinces => {
      // console.log(provinces);
      
      this.allprovinces = provinces;
    })
  }

  loadUpdate(province) {
    //console.log(province);
    
    this.id = province.id;
    this.provincename = province.provincename;
    this.formFor=this.threeStates[2];
  }

}
