import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
    products : Product[] = [];

    constructor(private productService: ProductService){}

    ngOnInit(): void {
      this.productService.getAllProducts().subscribe(page => this.products = page.content);
    }
}
