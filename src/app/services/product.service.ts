import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api = "http://localhost:8080/api/v1/products";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(this.api);
  }
}
