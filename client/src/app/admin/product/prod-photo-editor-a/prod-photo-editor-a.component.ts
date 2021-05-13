
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prod-photo-editor-a',
  templateUrl: './prod-photo-editor-a.component.html',
  styleUrls: ['./prod-photo-editor-a.component.css']
})
export class ProdPhotoEditorAComponent implements OnInit {

  urlname = "new";
  product: Product;
  photos: any [] = [];
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private urlTrack: ActivatedRoute, private accountService: AccountService, private productService: ProductService, private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    if(this.urlTrack.snapshot.paramMap.get('id') !== "new"){
      this.urlname = this.urlTrack.snapshot.paramMap.get('id')
      this.loadProduct(this.urlTrack.snapshot.paramMap.get('id'));
      this.initializeUploader();
    }
  }

  loadProduct(id) {
    this.productService
      .getProductById(id)
      .subscribe(product => {     
        this.product = product;
        
        if(this.product.photos.length > 0) {
          this.photos = [];
          this.photos = this.product.photos;
        }
        
      });
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + `product/add-photo/${this.urlname}`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem =(item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.product.photos.push(photo);
        this.loadProduct(this.product.id);
      }
    }
  }

  setMainPhoto(photo) {
    this.productService.setMainPhoto({"ProductId": this.product.id, "PhotoId": photo.id}).subscribe(() => {
      this.product.photoUrl = photo.url;
      this.product.photos.forEach(p => {
        
        if(p.isMain) {
          p.isMain = false;
        }
        
        if(p.id === photo.id) p.isMain = true;
      })
      this.toastr.success("Main Photo Updated!");
      this.loadProduct(this.product.id);
    })
  }

  removePhoto(photoId: number) {
    this.productService.removePhoto(photoId, this.product.id).subscribe(() => {
      this.product.photos = this.product.photos.filter(x => x.id !== photoId);
      this.toastr.success("Successfully removed photo!");
    })
  }



}
