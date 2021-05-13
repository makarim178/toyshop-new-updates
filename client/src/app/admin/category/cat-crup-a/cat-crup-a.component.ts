import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-cat-crup-a',
  templateUrl: './cat-crup-a.component.html',
  styleUrls: ['./cat-crup-a.component.css']
})
export class CatCrupAComponent implements OnInit {
  @Input() Id;
  @Input() categoryname;
  @Input() forInsert;
  @Input() fr;
  @Output() public childEvent = new EventEmitter();
  @Output() public saveEvent = new EventEmitter();

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cancelEventFromChild() {
    this.childEvent.emit('Cancel');
  }

  crup() {
    if(this.fr == "update"){
      const category = {
        id: this.Id,
        categoryName: this.categoryname
      };

      this.categoryService.Update(category).subscribe( () => {
        this.toastr.success("Updated SuccessFully!")
        this.cancelEventFromChild();
      })
    }

    if(this.fr == "insert" && this.categoryname != "") {
      const category = {
        categoryName: this.categoryname
      }
      this.categoryService.Insert(category).subscribe((response) => {
        this.toastr.success("New category is successfully created");
        this.cancelEventFromChild();
      })
    }
    

  }

}
