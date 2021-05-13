import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/_services/brand.service';

@Component({
  selector: 'app-brand-main-a',
  templateUrl: './brand-main-a.component.html',
  styleUrls: ['./brand-main-a.component.css']
})
export class BrandMainAComponent implements OnInit {

  allBrands;
  id;
  brandname;
  formFor="";
  threeStates = ["none","insert","update","view"]

  public cancelForm(todo) {
    if(todo == 'Cancel') {
      this.brandname = "";
      this.formFor = this.threeStates[0];
    }
    
    this.loadBrands();
    
    
  }

  constructor(private brandService: BrandService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formFor = this.threeStates[0];
    this.loadBrands();
  }

  click_addNew() {
    this.brandname = "";
    this.formFor = this.threeStates[1];
  }

  loadBrands() {
    this.brandService.GetAllBrands().subscribe(brands => {
      this.allBrands = brands;
    })
  }

  loadUpdate(brand) {
    this.id = brand.id;
    this.brandname = brand.brandName;
    this.formFor=this.threeStates[2];
    //console.log(brand);
    
  } 

}
