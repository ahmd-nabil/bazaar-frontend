import { Category } from "./category";

export class Product {
    id?: number;
    name?: string;
    description?: string;
    unitPrice?: number;
    imageUrl?: string;
    unitsInStock?:number;
    active?:boolean;
    sku?:string;
    createdDate?:Date;
    lastUpdated?:Date;
    categories?: Category[];
}