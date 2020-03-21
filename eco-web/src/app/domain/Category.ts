export class Category {
    id: number;
    code: string;
    label: string;

    constructor(id?: number, code?: string, label?: string) {
        this.id = id;
        this.code = code;
        this.label = label;
    }

    public getCode() {
        return this.code;
    }

    public getLabel() {
        return this.label;
    }
}