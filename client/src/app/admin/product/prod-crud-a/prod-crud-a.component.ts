
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { BrandService } from 'src/app/_services/brand.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-prod-crud-a',
  templateUrl: './prod-crud-a.component.html',
  styleUrls: ['./prod-crud-a.component.css']
})
export class ProdCrudAComponent implements OnInit {
  @ViewChild('prodForm') prodForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.prodForm.dirty) {
      $event.returnValue = true;
    }
  }
  forUpdate = false;

  brands: any[] =[];
  categories: any[]= [];

  product: any = {};

  selectedCat = 0;
  selectedBrand = 0;
  selectedGender=0;

  gender=['All','Boys','Girls']

  constructor(private urlTrack: ActivatedRoute, private productService: ProductService
      , private brandService: BrandService, private catService: CategoryService
      , private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    if(this.urlTrack.snapshot.paramMap.get('id') !== "new"){    
      //console.log("I am here");
        
      this.loadProduct(this.urlTrack.snapshot.paramMap.get('id'));
    }

    this.loadBrands();
    this.loadCategories();   
  }

  // getImages(): NgxGalleryImage[] {
  //   const imageUrls= [];
    
    
  //   for(const photo of this.product.photos) {
  //     console.log(photo);
      
      
  //     imageUrls.push({
  //       small: photo?.url,
  //       medium: photo?.url,
  //       big: photo?.url
  //     })
  //   }

  //   return imageUrls;
  // }

  loadProduct(prodid) {
    
    this.forUpdate = true;

    this.productService
      .getProductById(prodid)
      .subscribe(product => {
        //console.log(product);
        
        this.selectedBrand = product.brand.id;
        this.selectedCat = product.category.id;
        const gender = product.recommendedGender;

        if(gender == "All") this.selectedGender = 0;
        if(gender == "Boys") this.selectedGender = 1;
        if(gender == "Girls") this.selectedGender = 2;
        
        this.product = product
        //console.log(this.product);
      });
  }

  saveChanges(){
    if(!this.forUpdate) {
      this.saveProduct();
    }  

    if (this.forUpdate) this.updateProduct();
  }

  saveProduct() {
    this.product.recommendedGender = this.gender[this.selectedGender];
    const brand = (this.selectedBrand > 0) ? this.brands.filter(brand => brand.id == this.selectedBrand) : null;
    const category = (this.selectedCat > 0) ? this.categories.filter(category => category.id == this.selectedCat): null;

    if(brand != null) this.product.brand = brand[0];
    if(category != null) this.product.category = category[0];

    if(brand != null && category != null && this.product.productName != ""
      && this.product.skn != "") {
        this.productService.saveProduct(this.product).subscribe(product => {
          this.product = product;
          this.forUpdate = true;
          this.toastr.success("Product Added");
          this.route.navigateByUrl(`/${this.urlTrack.snapshot.url[0].path}`);
        })

      } else {
        this.toastr.warning("Please enter all fields");
      }
    
  }

  updateProduct() {
    this.product.recommendedGender = this.gender[this.selectedGender];
    const brand = (this.selectedBrand > 0) ? this.brands.filter(brand => brand.id == this.selectedBrand) : null;
    const category = (this.selectedCat > 0) ? this.categories.filter(category => category.id == this.selectedCat): null;

    if(brand != null) this.product.brand = brand[0];
    if(category != null) this.product.category = category[0];

    if(brand != null && category != null && this.product.productName != ""
      && this.product.skn != "") {

        this.product.brandId = this.selectedBrand;
        this.product.categoryId = this.selectedCat;

        this.productService.updateProduct(this.product).subscribe();
        
        // .subscribe(product => {
        //   this.product = product;
        //   this.forUpdate = true;
        //   this.toastr.success("Product Updated Successfully!");
        //   this.prodForm.reset(this.product);
        //   //this.route.navigateByUrl(`/${this.urlTrack.snapshot.url[0].path}`);
        // })

      } else {
        this.toastr.warning("Please enter all fields");
      }
  }

  loadBrands() {
    this.brandService.GetAllBrands().subscribe(brands => this.brands = brands);
  }

  loadCategories() {
    this.catService.GetAll().subscribe(categories => this.categories = categories);
  }

  onChangeBrand(event) {
    this.selectedBrand = event;
  }
  onChangeCategory(event) {
    this.selectedCat = event;
  }

  onChangeGender(event) {
    this.selectedGender = event;
  }

}
