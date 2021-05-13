import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/_services/brand.service';

@Component({
  selector: 'app-brand-crup-a',
  templateUrl: './brand-crup-a.component.html',
  styleUrls: ['./brand-crup-a.component.css']
})
export class BrandCrupAComponent implements OnInit {
  @Input() Id;
  @Input() brandname;
  @Input() forInsert;
  @Input() fr;
  @Output() public childEvent = new EventEmitter();
  @Output() public saveEvent = new EventEmitter();

  constructor(private brandService: BrandService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // console.log(this.fr);
    // console.log(this.brandname);
    // console.log(this.Id);
  }

  cancelEventFromChild() {
    this.childEvent.emit('Cancel');
  }

  crup() {
    if(this.fr == "update"){
      const brand = {
        id: this.Id,
        brandName: this.brandname
      };

      this.brandService.UpdateBrand(brand).subscribe( () => {
        this.toastr.success("Updated SuccessFully!")
        this.cancelEventFromChild();
      })
    }

    if(this.fr == "insert" && this.brandname != "") {
      const brand = {
        brandName: this.brandname
      }
      this.brandService.InsertBrand(brand).subscribe((response) => {
        this.toastr.success("New brand is successfully created");
        this.cancelEventFromChild();
      })
    }
    

  }



}
