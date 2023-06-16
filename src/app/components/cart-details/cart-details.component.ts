import { Component } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {
  cartItems: CartItem[] = []
}
