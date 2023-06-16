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
  subTotal = 999;
  shipping = 0;

  plusIcon = faPlus;
  minusIcon = faMinus;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.shoppingCartService.totalPrice.subscribe(val => this.subTotal = val);
    this.cartItems = this.shoppingCartService.cartItems;
  }

  incrementQuantity(item: CartItem){}
  decrementQuantity(item: CartItem){}
}
