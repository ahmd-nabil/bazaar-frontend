import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  subTotal = 0;
  shipping = 0;

  plusIcon = faPlus;
  minusIcon = faMinus;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.shoppingCartService.totalPrice.subscribe(val => this.subTotal = val);
    this.cartItems = this.shoppingCartService.cartItems;
  }

  incrementQuantity(item: CartItem) {
    this.shoppingCartService.incrementQuantity(item);
  }

  decrementQuantity(item: CartItem) {
    this.shoppingCartService.decrementQuantity(item);
  }

  onQuantityChange(item: CartItem, input: string) {
    const pattern = /^[0-9]*$/;
    if(!pattern.test(input) || +input <= 0) {
      this.shoppingCartService.changeQuantity(item, 0);
      return;
    }
    this.shoppingCartService.changeQuantity(item, +input);
  }
}
