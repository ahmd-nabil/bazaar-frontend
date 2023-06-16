import { Product } from "./product";

export class CartItem {
    id!: number;
    name!: string;
    description?: string;
    unitPrice!: number;
    imageUrl?: string;

    quantity = 1;
    constructor(product : Product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.unitPrice = product.unitPrice;
        this.imageUrl = product.imageUrl;
    }
}