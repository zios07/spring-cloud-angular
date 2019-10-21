import { BaseModel } from '../../_base/crud';

export class Role extends BaseModel {
    id: number;
    code: string;
    label: string;
    permissions: number[];
    isCoreRole: boolean = false;
    title: string;
    
    clear(): void {
        this.id = undefined;
        this.code = '';
        this.label = '';
        this.permissions = [];
        this.isCoreRole = false;
	}
}
