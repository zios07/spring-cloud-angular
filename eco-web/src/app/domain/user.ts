import { Account } from './account';
import { Role } from './role';

export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    account: Account;
    role: Role;
    bDate: Date;
    accessToken: string;

    constructor(id?: number, firstName?: string, lastName?: string, email?: string,
        account?: Account, role?: Role, bDate?: Date) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.account = account;
        this.role = role;
        this.bDate = bDate;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }

    getAccount() {
        return this.account;
    }

    getRole() {
        return this.role;
    }

    getBDate() {
        return this.bDate;
    }

    setAccount(ac: Account) {
        this.account = ac;
    }

    setRole(rl: Role) {
        this.role = rl;
    }

}