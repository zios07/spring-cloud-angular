import { BaseModel } from '../../_base/crud';

export class Account extends BaseModel {
    username: string;
    password: string;
}
