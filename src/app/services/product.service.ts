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

  getAllProducts(categoryId ?: number, search ?: string): Observable<Page<Product>> {
    let params = new HttpParams();
    if(categoryId) {
      params = params.set('categoryId', categoryId);
    }

    if(search) {
      params = params.set('search', search);
    }

    return this.http.get<Page<Product>>(this.PRODUCTS_API, {params: params});
  }
}
