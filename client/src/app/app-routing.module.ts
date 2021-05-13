import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandMainAComponent } from './admin/brand/brand-main-a/brand-main-a.component';
import { CatMainAComponent } from './admin/category/cat-main-a/cat-main-a.component';
import { CityMainAComponent } from './admin/city/city-main-a/city-main-a.component';
import { CountryMainAComponent } from './admin/country/country-main-a/country-main-a.component';
import { ProdCrudAComponent } from './admin/product/prod-crud-a/prod-crud-a.component';
import { ProdMainAComponent } from './admin/product/prod-main-a/prod-main-a.component';
import { ProvinceMainAComponent } from './admin/province/province-main-a/province-main-a.component';
import { UserPanelComponent } from './admin/user-panel/user-panel.component';
import { CartMainComponent } from './cart/cart-main/cart-main.component';
import { CheckoutMainComponent } from './checkout/checkout-main/checkout-main.component';
import { OrderCompleteComponent } from './checkout/order-complete/order-complete.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsUComponent } from './products/product-details-u/product-details-u.component';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userdash/userprofile/userprofile.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'user', component: UserprofileComponent},
      {path: 'brand', component: BrandMainAComponent},
      {path: 'category', component: CatMainAComponent},
      {path: 'city', component: CityMainAComponent},
      {path: 'country', component: CountryMainAComponent},
      {path: 'province', component: ProvinceMainAComponent},
      {path: 'prod', component: ProdMainAComponent, canActivate: [AdminGuard]},
      {path: 'user-management', component: UserPanelComponent, canActivate: [AdminGuard]},
      {path: 'prod/:id', component: ProdCrudAComponent, canDeactivate: [PreventUnsavedChangesGuard], canActivate: [AdminGuard]},
      // {path: 'product', component:},
    ]
  },
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'errors', component:TestErrorsComponent},
  {path: 'not-found', component:NotFoundComponent},
  {path: 'server-error', component:ServerErrorComponent},
  {path: 'product/:id', component:ProductDetailsUComponent},
  {path: 'cart', component:CartMainComponent},
  {path: 'checkout', component:CheckoutMainComponent},
  {path: 'orderConfirm', component:OrderCompleteComponent},
  {path: '**', component: NotFoundComponent, pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
