import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-country-list-a',
  templateUrl: './country-list-a.component.html',
  styleUrls: ['./country-list-a.component.css']
})
export class CountryListAComponent implements OnInit {

  @Input() countries;
  @Output() public editEmitter = new EventEmitter();
  @Output() public deleteEmitter = new EventEmitter();

  constructor(private countryService: CountryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  update(country) {
    this.editEmitter.emit(country);
  }

  remove(id) {
    this.countryService.Remove(id).subscribe(() => {
      this.toastr.success("Successfully Removed a country!");
      this.deleteEmitter.emit('Deleted');
    })
  }
  
}
