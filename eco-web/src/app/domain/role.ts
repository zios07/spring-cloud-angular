export class Role {
    id:number;
    roleCode: string;
    roleLabel: string;

    constructor(id?: number, roleCode?: string, roleLabel?: string) {
        this.id = id;
        this.roleCode = roleCode;
        this.roleLabel = roleLabel;
    }

    getRoleCode() {
        return this.roleCode;
    }

    getRoleLabel() {
        return this.roleLabel;
    }
}