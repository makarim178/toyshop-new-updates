import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CityService } from 'src/app/_services/city.service';

@Component({
  selector: 'app-city-crup-a',
  templateUrl: './city-crup-a.component.html',
  styleUrls: ['./city-crup-a.component.css']
})
export class CityCrupAComponent implements OnInit {

  @Input() Id;
  @Input() cityname;
  @Input() forInsert;
  @Input() fr;
  @Output() public childEvent = new EventEmitter();
  @Output() public saveEvent = new EventEmitter();

  constructor(private cityService: CityService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cancelEventFromChild() {
    this.childEvent.emit('Cancel');
  }

  crup() {
    if(this.fr == "update"){
      const city = {
        id: this.Id,
        cityname: this.cityname
      };

      this.cityService.Update(city).subscribe( () => {
        this.toastr.success("Updated SuccessFully!")
        this.cancelEventFromChild();
      })
    }

    if(this.fr == "insert" && this.cityname != "") {
      const city = {
        cityname: this.cityname
      }
      this.cityService.Insert(city).subscribe((response) => {
        this.toastr.success("New city is successfully created");
        this.cancelEventFromChild();
      })
    }
  }

}
