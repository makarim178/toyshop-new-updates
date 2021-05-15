import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { ProdParams } from '../_models/prodParams';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  productCache = new Map();
  

  constructor(private http: HttpClient) { }

  getProducts(prodParams: ProdParams) {

    // var response = this.productCache.get(Object.values(prodParams).join('-'));
    // if(response) {
    //   return of(response);
    // }
    
    let params = this.getPainationHeaders(prodParams.pageNumber, prodParams.pageSize);

    if(prodParams.searchString != "") params = params.append("searchString", prodParams.searchString);

    params = params.append("Gender", prodParams.Gender);
    params = params.append("brand", prodParams.brand);
    params =params.append("category", prodParams.category);
    params = params.append("MinAge", prodParams.MinAge.toString());
    params = params.append("MaxAge", prodParams.MaxAge.toString());

    
    if(prodParams.OrderBy != "low") params = params.append("OrderBy", prodParams.OrderBy);
    
    return this.getPaginatedResult<Product[]>(this.baseUrl + 'product', params)
      .pipe(map(response => {
        this.productCache.set(Object.values(prodParams).join('-'), response);
        return response;
      }))
  }

  private getPaginatedResult<T>(url, params) {
    
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    console.log(url);
    console.log(params);
    
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPainationHeaders(pageNumber: number, pageSize: number)
  {
    let params = new HttpParams();

      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());

      return params;

  }

  getProductById(id:any) {
    const product = [...this.productCache.values()]
      .reduce((arr,elem) => arr.concat(elem.result), [])
      .find((product: Product) => product.id === id);

      if(product) {
        return of(product);
      }
      
    return this.http.get<Product>(this.baseUrl + `product/${id}`);
  }

  getProductBySkn(skn: string){
    // const product = this.products.find(x=> x.skn == skn);
    // if(product !== undefined) return of(product);
    const product = [...this.productCache.values()]
      .reduce((arr,elem) => arr.concat(elem.result), [])
      .find((product: Product) => product.skn === skn);

    if(product) {
      return of(product);
    }
    return this.http.get<Product>(this.baseUrl + `product/skn/${skn}`);
  }

  saveProduct(product) {
    return this.http.post<Product>(this.baseUrl + 'product/addProduct', product);
  }

  updateProduct(product) {
    return this.http.put(this.baseUrl + 'product/product', product).pipe(map(() => {
      const index = this.products.indexOf(product);
      this.products[index] = product;
    }));
  }

  removeProduct(id) {
    return this.http.delete(this.baseUrl + `product/${id}`);
  }

  setMainPhoto(photoUpdate) {
    return this.http.put(this.baseUrl + 'product/set-main-photo', photoUpdate);
  }
  removePhoto(photoId: number, prodId: number) {
    return this.http.delete(this.baseUrl + `product/delete-photo/${photoId}/${prodId}`);
  }
}
