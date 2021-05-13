import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-cat-list-a',
  templateUrl: './cat-list-a.component.html',
  styleUrls: ['./cat-list-a.component.css']
})
export class CatListAComponent implements OnInit {
  @Input() categories;
  @Output() public editEmitter = new EventEmitter();
  @Output() public deleteEmitter = new EventEmitter();

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  update(category) {
    this.editEmitter.emit(category);
  }

  remove(id) {
    this.categoryService.Remove(id).subscribe(() => {
      this.toastr.success("Successfully Removed a category!");
      this.deleteEmitter.emit('Deleted');
    })

  }

}
