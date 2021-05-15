import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/_models/brand';
import { Category } from 'src/app/_models/category';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { ProdParams } from 'src/app/_models/prodParams';
import { Product } from 'src/app/_models/product';
import { BrandService } from 'src/app/_services/brand.service';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list-u',
  templateUrl: './product-list-u.component.html',
  styleUrls: ['./product-list-u.component.css']
})
export class ProductListUComponent implements OnInit {

  brands: Brand[];
  categories: Category[];
  products: Product[];
  pagination: Pagination;
  prodParams: ProdParams = {
    pageNumber : 1,
    pageSize : 8,
    Gender: "All",
    MaxAge : 100,
    MinAge: 0,
    searchString: "",
    brand : "All",
    category : "All",
    OrderBy: "low"
  };
  recAge:number=0;
  
  //products$: Observable<Product[]>;

  constructor(private productService: ProductService, private toastr: ToastrService, private cartService: CartService, private brandService: BrandService, private catService: CategoryService) { }

  ngOnInit(): void {
    // this.products$ = this.productService.getProducts();
    this.loadBrands();
    this.loadCategory();
    this.loadProducts();
  }

  loadBrands() {
    this.brandService.GetAllBrands().subscribe(brands => {
      this.brands = brands;
    })
  }

  loadCategory() {
    this.catService.GetAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  loadProducts(){
    
    this.productService.getProducts(this.prodParams).subscribe(response => {
      //console.log(response.result);
      
      this.products = response.result;
      this.pagination = response.pagination;
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

  pageChanged(event: any) {
    this.prodParams.pageNumber = event.page;
    
    //console.log(event);
    
    this.loadProducts();
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

  // loadProducts() {
  //   this.productService.getProducts().subscribe(products => {
  //     this.products = products;
  //   })
  // }

  
}
