import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  categoryId ?: number;
  search ?: string;
  pageNumber : number = 1;    // default page is page 1
  totalPages !: number;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];
      this.search = params['search'];
      if(params['pageNumber']) this.pageNumber = +params['pageNumber'];
      this.productService.getAllProducts(this.pageNumber, this.categoryId, this.search).subscribe(page => {
        this.products = page.content;
        this.totalPages = page.totalPages;
      });
    });
  }
}
