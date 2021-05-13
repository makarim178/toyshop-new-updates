import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-country-crup-a',
  templateUrl: './country-crup-a.component.html',
  styleUrls: ['./country-crup-a.component.css']
})
export class CountryCrupAComponent implements OnInit {

  @Input() Id;
  @Input() countryname;
  @Input() forInsert;
  @Input() fr;
  @Output() public childEvent = new EventEmitter();
  @Output() public saveEvent = new EventEmitter();

  constructor(private countryService: CountryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cancelEventFromChild() {
    this.childEvent.emit('Cancel');
  }

  crup() {
    if(this.fr == "update"){
      const country = {
        id: this.Id,
        countryname: this.countryname
      };

      this.countryService.Update(country).subscribe( () => {
        this.toastr.success("Updated SuccessFully!")
        this.cancelEventFromChild();
      })
    }

    if(this.fr == "insert" && this.countryname != "") {
      const country = {
        countryname: this.countryname
      }
      this.countryService.Insert(country).subscribe((response) => {
        this.toastr.success("New country is successfully created");
        this.cancelEventFromChild();
      })
    }
  }

}
