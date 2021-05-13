import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CityService } from 'src/app/_services/city.service';

@Component({
  selector: 'app-city-list-a',
  templateUrl: './city-list-a.component.html',
  styleUrls: ['./city-list-a.component.css']
})
export class CityListAComponent implements OnInit {

  @Input() cities;
  @Output() public editEmitter = new EventEmitter();
  @Output() public deleteEmitter = new EventEmitter();

  constructor(private cityService: CityService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  update(city) {
    this.editEmitter.emit(city);
  }

  remove(id) {
    this.cityService.Remove(id).subscribe(() => {
      this.toastr.success("Successfully Removed a city!");
      this.deleteEmitter.emit('Deleted');
    })
  }

}
