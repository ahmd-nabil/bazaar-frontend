import { OrderLine } from "./order-line";
import { Address } from "./address";

export class Order {
    firstName !: string;
    lastName !: string;
    email !: string;

    // payment info
    cardNumber !: string;
    cardExpiry !: string;
    cvc !: string;

    // Shipping address info
    shippingAddress: Address;
    billingAddress: Address;
    orderLines : OrderLine[] = [];

    constructor(firstName:string, lastName:string, email:string,
        cardNumber:string, cardExpiry:string, cvc:string,
        shippingAddress: Address, billingAddress: Address, orderLines: OrderLine[]) 
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.cardNumber = cardNumber;
        this.cardExpiry = cardExpiry;
        this.cvc = cvc;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.orderLines = orderLines;
    }
}