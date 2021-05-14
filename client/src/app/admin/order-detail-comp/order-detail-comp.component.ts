
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-order-detail-comp',
  templateUrl: './order-detail-comp.component.html',
  styleUrls: ['./order-detail-comp.component.css']
})
export class OrderDetailCompComponent implements OnInit {

  @Input() orderDetails;
  product;

  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
    this.loadProduct(); 
    
  }

  loadProduct() {
    this.prodService.getProductById(this.orderDetails.productId).subscribe(prod => {
      console.log(prod);
      this.product = prod;
    })
  }

}
