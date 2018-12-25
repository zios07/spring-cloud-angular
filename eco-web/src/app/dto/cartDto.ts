import { Product } from "../domain/product";

export class CartDto {

    constructor(private username:string, private product:Product){
        this.username = username;
        this.product = product;
    }

    getProduct(){
        return this.product;
    }
    getUsername(){
        return this.username;
    }
}