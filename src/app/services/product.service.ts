import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Page } from '../model/page';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly PRODUCTS_API = "http://localhost:8080/api/v1/products";

  constructor(private http: HttpClient) { }

  getAllProducts(
      pageNumber : number = 1,
      categoryId ?: number,
      search ?: string,
      pageSize : number = 20
      ): Observable<Page<Product>> {
    let requestParams = new HttpParams();
    if(categoryId) {
      requestParams = requestParams.set('categoryId', categoryId);
    }

    if(search) {
      requestParams = requestParams.set('search', search);
    }

    requestParams = requestParams.set('pageNumber', pageNumber);
    requestParams = requestParams.set('pageSize', pageSize)
    return this.http.get<Page<Product>>(this.PRODUCTS_API, {params: requestParams});
  }


  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCTS_API}/${productId}`);
  }
}
