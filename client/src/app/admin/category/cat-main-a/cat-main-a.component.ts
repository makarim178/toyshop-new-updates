import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-cat-main-a',
  templateUrl: './cat-main-a.component.html',
  styleUrls: ['./cat-main-a.component.css']
})
export class CatMainAComponent implements OnInit {

  allCategories;
  id;
  categoryname;
  formFor="";
  threeStates = ["none","insert","update","view"]

  public cancelForm(todo) {
    if(todo == 'Cancel') {
      this.categoryname = "";
      this.formFor = this.threeStates[0];
    }
    
    this.loadCategory();
  }

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryname = "";
    this.formFor = this.threeStates[0];
    this.loadCategory()
  }

  click_addNew() {
    this.categoryname = "";
    this.formFor = this.threeStates[1];
  }

  loadCategory() {
    this.categoryService.GetAll().subscribe(categories => {
      // console.log(categories);
      
      this.allCategories = categories;
    })
  }

  loadUpdate(category) {
    this.id = category.id;
    this.categoryname = category.categoryName;
    this.formFor=this.threeStates[2];
  } 

}
