import { AUTO_STYLE } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details-u',
  templateUrl: './product-details-u.component.html',
  styleUrls: ['./product-details-u.component.css']
})
export class ProductDetailsUComponent implements OnInit {
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private productService:ProductService, private urlTrack:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();

    this.galleryOptions = [
      {
        width:"100%",
        imagePercent: 80,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.product.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadProduct(){
    this.productService.getProductById(this.urlTrack.snapshot.paramMap.get('id'))
      .subscribe(product => {
        // console.log(product);
        
        this.product = product;
        this.galleryImages = this.getImages();
      });


  }

}
