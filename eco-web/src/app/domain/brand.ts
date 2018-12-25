export class Brand {
    id:number;
    code:string;
    label:string;
    country:string;

    constructor(id?:number, code?:string,label?:string,country?:string) {
        this.id = id;
        this.code = code;
        this.label = label;
        this.country = country;
    }

    public getCode(){
        return this.code;
    }

    public getLabel(){
        return this.label;
    }

    public getCountry(){
        return this.country;
    }
}