import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProvinceService } from 'src/app/_services/province.service';

@Component({
  selector: 'app-province-list-a',
  templateUrl: './province-list-a.component.html',
  styleUrls: ['./province-list-a.component.css']
})
export class ProvinceListAComponent implements OnInit {

  @Input() provinces;
  @Output() public editEmitter = new EventEmitter();
  @Output() public deleteEmitter = new EventEmitter();

  constructor(private provinceService: ProvinceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  update(province) {
    this.editEmitter.emit(province);
  }

  remove(id) {
    this.provinceService.Remove(id).subscribe(() => {
      this.toastr.success("Successfully Removed a province!");
      this.deleteEmitter.emit('Deleted');
    })
  }

}
