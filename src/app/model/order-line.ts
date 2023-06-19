import { CartItem } from "./cart-item";
import { Product } from "./product";

export class OrderLine {
    
    constructor(cartItem: CartItem) {
        this.productId = cartItem.id;
        this.unitPrice = cartItem.unitPrice;
        this.quantity = cartItem.quantity;
    }
    
    id ?: number;
    productId ?: number;
    unitPrice?: number;
    quantity ?: number;
}