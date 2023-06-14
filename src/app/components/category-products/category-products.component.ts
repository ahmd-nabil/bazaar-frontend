import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit{
  products: Product[] = [];
  categoryId !: number;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService  
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId']
    });
    
    this.productService.getAllProducts(this.categoryId)
    
  }
}