import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Subject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  cartItems : CartItem[] = [];
  totalItems : Subject<number> = new Subject();
  totalPrice: Subject<number> = new Subject();

  constructor() { }

  addToCart(product: Product) {
    let item = new CartItem(product);
    const foundCartItem = this.cartItems.find(cartItem => item.id == cartItem.id);
    foundCartItem ? foundCartItem.quantity++ : this.cartItems.unshift(item);
    this.totalItems.next(this.getTotalItems());
    this.totalPrice.next(this.getTotalPrice());
  }

  private getTotalItems(): number {
    let totalItems = 0;
    for(let item of this.cartItems) {
      totalItems += item.quantity;
    }
    return totalItems;
  }

  private getTotalPrice(): number {
    let totalPrice = 0;
    for(let item of this.cartItems) {
      totalPrice += (item.quantity * item.unitPrice);
    }
    return totalPrice;
  }
}
