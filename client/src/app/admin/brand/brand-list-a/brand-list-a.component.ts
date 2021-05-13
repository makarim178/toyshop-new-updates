import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/_services/brand.service';

@Component({
  selector: 'app-brand-list-a',
  templateUrl: './brand-list-a.component.html',
  styleUrls: ['./brand-list-a.component.css']
})
export class BrandListAComponent implements OnInit {
  @Input() brands;
  @Output() public editEmitter = new EventEmitter();
  @Output() public deleteEmitter = new EventEmitter();

  constructor(private brandService: BrandService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  updateProduct(brand) {
    this.editEmitter.emit(brand);
    //console.log(brand);
  }

  removeBrand(id) {
    this.brandService.RemoveBrand(id).subscribe(() => {
      this.toastr.success("Successfully Removed a brand!");
      this.deleteEmitter.emit('Deleted');
    })

  }

}
