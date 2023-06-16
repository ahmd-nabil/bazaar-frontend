import { Injectable, OnInit } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Product } from '../model/product';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{
  cartItems : CartItem[] = [];
  totalItems : BehaviorSubject<number> = new BehaviorSubject(this.getTotalItems());
  totalPrice: BehaviorSubject<number> = new BehaviorSubject(this.getTotalPrice());

  constructor() {
    const localStorageCart = localStorage.getItem('shoppingCart');
    if(localStorageCart) {
      this.cartItems = JSON.parse(localStorageCart);
    }
    this.notifyAll();
  }

  notifyAll() {
    this.totalItems.next(this.getTotalItems());
    this.totalPrice.next(this.getTotalPrice());

    // assuming that localstorage change is also a notification
    localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
  }

  changeQuantity(item: CartItem, value: number) {
    let itemIndx = this.cartItems.findIndex(cartItem => cartItem.id == item.id);
    value == 0? this.cartItems.splice(itemIndx, 1): this.cartItems[itemIndx].quantity = value;;
    this.notifyAll();
  }

  incrementQuantity(item: CartItem) {
    let itemIndx = this.cartItems.findIndex(cartItem => cartItem.id == item.id);
    this.cartItems[itemIndx].quantity++;
    this.notifyAll();
  }

  decrementQuantity(item: CartItem) {
    let itemIndx = this.cartItems.findIndex(cartItem => cartItem.id == item.id);
    this.cartItems[itemIndx].quantity == 1? this.cartItems.splice(itemIndx, 1): this.cartItems[itemIndx].quantity--;
    this.notifyAll();
  }

  addToCart(product: Product) {
    let item = new CartItem(product);
    const foundCartItem = this.cartItems.find(cartItem => item.id == cartItem.id);
    foundCartItem ? foundCartItem.quantity++ : this.cartItems.unshift(item);
    this.notifyAll();
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
