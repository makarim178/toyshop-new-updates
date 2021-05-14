import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserprofileComponent } from './userdash/userprofile/userprofile.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ProductListUComponent } from './products/product-list-u/product-list-u.component';
import { ProductCardUComponent } from './products/product-card-u/product-card-u.component';
import { ProductDetailsUComponent } from './products/product-details-u/product-details-u.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { BrandMainAComponent } from './admin/brand/brand-main-a/brand-main-a.component';
import { BrandListAComponent } from './admin/brand/brand-list-a/brand-list-a.component';
import { BrandCrupAComponent } from './admin/brand/brand-crup-a/brand-crup-a.component';
import { CatCrupAComponent } from './admin/category/cat-crup-a/cat-crup-a.component';
import { CatListAComponent } from './admin/category/cat-list-a/cat-list-a.component';
import { CatMainAComponent } from './admin/category/cat-main-a/cat-main-a.component';
import { CountryMainAComponent } from './admin/country/country-main-a/country-main-a.component';
import { CountryListAComponent } from './admin/country/country-list-a/country-list-a.component';
import { CountryCrupAComponent } from './admin/country/country-crup-a/country-crup-a.component';
import { CityCrupAComponent } from './admin/city/city-crup-a/city-crup-a.component';
import { CityListAComponent } from './admin/city/city-list-a/city-list-a.component';
import { CityMainAComponent } from './admin/city/city-main-a/city-main-a.component';
import { ProvinceMainAComponent } from './admin/province/province-main-a/province-main-a.component';
import { ProvinceListAComponent } from './admin/province/province-list-a/province-list-a.component';
import { ProvinceCrupAComponent } from './admin/province/province-crup-a/province-crup-a.component';
import { ProdMainAComponent } from './admin/product/prod-main-a/prod-main-a.component';
import { ProdCrudAComponent } from './admin/product/prod-crud-a/prod-crud-a.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ProdPhotoEditorAComponent } from './admin/product/prod-photo-editor-a/prod-photo-editor-a.component';
import { CartMainComponent } from './cart/cart-main/cart-main.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartSummaryComponent } from './cart/cart-summary/cart-summary.component';
import { CheckoutMainComponent } from './checkout/checkout-main/checkout-main.component';
import { NgxBraintreeModule } from 'ngx-braintree';
import { OrderCompleteComponent } from './checkout/order-complete/order-complete.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserPanelComponent } from './admin/user-panel/user-panel.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserprofileComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ProductListUComponent,
    ProductCardUComponent,
    ProductDetailsUComponent,
    BrandMainAComponent,
    BrandListAComponent,
    BrandCrupAComponent,
    CatCrupAComponent,
    CatListAComponent,
    CatMainAComponent,
    CountryMainAComponent,
    CountryListAComponent,
    CountryCrupAComponent,
    CityCrupAComponent,
    CityListAComponent,
    CityMainAComponent,
    ProvinceMainAComponent,
    ProvinceListAComponent,
    ProvinceCrupAComponent,
    ProdMainAComponent,
    ProdCrudAComponent,
    ProdPhotoEditorAComponent,
    CartMainComponent,
    CartListComponent,
    CartSummaryComponent,
    CheckoutMainComponent,
    OrderCompleteComponent,
    HasRoleDirective,
    UserManagementComponent,
    UserPanelComponent,
    RolesModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxBraintreeModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
