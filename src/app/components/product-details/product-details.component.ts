import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product = new Product();

  constructor(
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const productId = +this.route.snapshot.params['productId'];
      this.productService.getProductById(productId).subscribe(
      product => {
        this.product = product;
      }
    )
    });
  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
}
