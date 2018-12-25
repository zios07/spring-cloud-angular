import { Brand } from "./brand";
import { Category } from "./Category";

export class Product{
    id: string;
    code: string;
    label: string;
    description: string;
    qteStock: number;
    price: number;
    brand: Brand;
    uuid: string;
    images: any;
    mainImage: any;
    category: Category;

    constructor(id?:string, code?:string, label?:string, description?: string, price?:number,
         brand?: Brand, qteStock?: number, uuid?: string, category?: Category) {
        this.id = id;
        this.code = code;
        this.label = label;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.qteStock = qteStock;
        this.uuid = uuid;
        this.category = category;
    }

    public getCode(){
        return this.code;
    }

    public getLabel(){
        return this.label;
    }

    public getDescription() {
        return this.description;
    }

    public getPrice(){
        return this.price;
    }

    public getBrand() {
        return this.brand;
    }

    public getUuid() {
        return this.uuid;
    }

    public getCategory() {
        return this.category;
    }

}