import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProvinceService } from 'src/app/_services/province.service';

@Component({
  selector: 'app-province-crup-a',
  templateUrl: './province-crup-a.component.html',
  styleUrls: ['./province-crup-a.component.css']
})
export class ProvinceCrupAComponent implements OnInit {

  @Input() Id;
  @Input() provincename;
  @Input() forInsert;
  @Input() fr;
  @Output() public childEvent = new EventEmitter();
  @Output() public saveEvent = new EventEmitter();

  constructor(private provinceService: ProvinceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  cancelEventFromChild() {
    this.childEvent.emit('Cancel');
  }

  crup() {
    if(this.fr == "update"){
      const province = {
        id: this.Id,
        provincename: this.provincename
      };

      this.provinceService.Update(province).subscribe( () => {
        this.toastr.success("Updated SuccessFully!")
        this.cancelEventFromChild();
      })
    }

    if(this.fr == "insert" && this.provincename != "") {
      const province = {
        provincename: this.provincename
      }
      this.provinceService.Insert(province).subscribe((response) => {
        this.toastr.success("New province is successfully created");
        this.cancelEventFromChild();
      })
    }
  }

}
