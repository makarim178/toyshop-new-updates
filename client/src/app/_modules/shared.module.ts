import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TabsModule } from "ngx-bootstrap/tabs";
import { FileUploadModule } from "ng2-file-upload";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxGalleryModule, 
    TabsModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    NgxGalleryModule,
    TabsModule,
    FileUploadModule,
    PaginationModule,
    ModalModule,
  ]
})
export class SharedModule { }
