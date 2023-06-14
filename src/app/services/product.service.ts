import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly PRODUCTS_API = "http://localhost:8080/api/v1/products";

  constructor(private http: HttpClient) { }

  getAllProducts(categoryId ?: number): Observable<Page<Product>> {
    const options = categoryId ?
   { params: new HttpParams().set('categoryId', categoryId) } : {};

    return this.http.get<Page<Product>>(this.PRODUCTS_API, options);
  }
}
