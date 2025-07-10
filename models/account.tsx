import { Course } from "./course";

export class Account {
    _id: number;
    _accountName: string;
    _password: string;
    _createDate: string;
    _favourites?: Course[];

    constructor(id: number, accountName: string, password: string, createDate: string, favourites: Course[]) {
        this._id = id;
        this._accountName = accountName;
        this._password = password;
        this._createDate = createDate;
        this._favourites = favourites;
    }
}

export const mockData: Account[] = [
    new Account(1, "mrdoc", "123", "2025-07-10T12:00:00", []),
    new Account(2, "fakeAdmin", "123", "2025-07-10T12:00:00", []),
    new Account(3, "unknown", "123", "2025-07-10T12:00:00", []),
    new Account(4, "Pasechaser", "123", "2025-07-10T12:00:00", []),
    new Account(5, "CrusaderAndTheHolly", "123", "2025-07-10T12:00:00", []),
];