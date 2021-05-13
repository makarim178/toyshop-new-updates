import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/_models/brand';
import { Category } from 'src/app/_models/category';
import { Pagination } from 'src/app/_models/pagination';
import { ProdParams } from 'src/app/_models/prodParams';
import { Product } from 'src/app/_models/product';
import { BrandService } from 'src/app/_services/brand.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-prod-main-a',
  templateUrl: './prod-main-a.component.html',
  styleUrls: ['./prod-main-a.component.css']
})
export class ProdMainAComponent implements OnInit {

  searchType = 0;
  selectedOption = 0;
  skn="";
  loadSkn = false;
  loadOptions : any [] = [];
  productList: Product [] = [];
  recAge:number=0;
  prodParams: ProdParams = {
    pageNumber : 1,
    pageSize : 5,
    Gender: "All",
    MaxAge : 100,
    MinAge: 0,
    searchString: "",
    brand : "All",
    category : "All",
    OrderBy: "low"
  };

  brands : Brand [] = [];
  categories: Category [] =[];
  pagination: Pagination;

  constructor(private brandService:BrandService, private categoryService: CategoryService
      , private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategory();
    this.loadProductList();
  }



  // onChangeSearchType(event) {
  //   this.loadOptions=[];
  //   if(event == 1 || event == "1") {
  //     this.loadSkn = true;
  //   } else {
  //     this.loadSkn = false;
  //     if(event == 2 || event == "2") this.loadBrand();
  //     if(event == 3 || event == "3") this.loadCategory();
  //   }
  // }

  pageChanged(event: any) {
    this.prodParams.pageNumber = event.page;
    this.loadProductList();
  }

  Search() {

  }

  loadProductList() {
    if(this.searchType == 0) {
      this.productService.getProducts(this.prodParams).subscribe(response => {
        this.productList = response.result;
        this.pagination = response.pagination;
      })
    }

    if(this.searchType == 1) {
      this.productService.getProductBySkn(this.skn).subscribe(product => {
        const searchProd = [];
        searchProd.push(product);
        this.productList = searchProd;
      })
    }
  }

  removeProduct(id) {
    this.productService.removeProduct(id).subscribe(response => {
      this.toastr.success("Successfully removed!");
      this.loadProductList();
    })
  }


  // from productlist


  loadBrands() {
    this.brandService.GetAllBrands().subscribe(brands => {
      this.brands = brands;
    })
  }

  loadCategory() {
    this.categoryService.GetAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  setAgeParams() {
    this.prodParams.MinAge = 0;
    this.prodParams.MaxAge = 100;
    
    if(this.recAge == 1 ) {
      this.prodParams.MaxAge = 1;
    }

    if(this.recAge == 2) {
      this.prodParams.MinAge = 1
      this.prodParams.MaxAge = 2;
    }
    if(this.recAge == 3) {
      this.prodParams.MinAge = 3
      this.prodParams.MaxAge = 4;
    }
    if(this.recAge == 4) {
      this.prodParams.MinAge = 5
      this.prodParams.MaxAge = 7;
    }
    if(this.recAge == 5) {
      this.prodParams.MinAge = 8
      this.prodParams.MaxAge = 11;
    }
    if(this.recAge == 6) {
      this.prodParams.MinAge = 12
      this.prodParams.MaxAge = 14;
    }
    if(this.recAge == 7) {
      this.prodParams.MinAge = 15
    }

    this.loadProducts();
  }

  loadProducts(){
    
    this.productService.getProducts(this.prodParams).subscribe(response => {
      this.productList = response.result;
      this.pagination = response.pagination;
    })
  }

  

  resetFilters() {
    this.prodParams.pageNumber=1;
    this.prodParams.pageSize=5,
    this.prodParams.Gender = "All"
    this.prodParams.MaxAge = 100;
    this.prodParams.MinAge = 0;
    this.prodParams.searchString = "";
    this.prodParams.brand = "All";
    this.prodParams.category = "All";
    this.loadProducts();
  }

}
