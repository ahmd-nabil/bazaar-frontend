import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
    products : Product[] = [];
    pageNumber : number = 1;

    constructor(
      private productService: ProductService,
      private route: ActivatedRoute
    ){}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        if(params['pageNumber']) {
          this.pageNumber = +params['pageNumber'];
        }
        this.productService.getAllProducts(this.pageNumber).subscribe(page => {
          this.products = page.content;
          console.log(page);
        })
      })
    }
}
