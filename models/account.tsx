import { Course } from "./course";
import { Purchase, purchaseMockData } from "./purchase";

export class Account {
    _id: number;
    _accountName: string;
    _password: string;
    _createDate: string;
    _favouriteList?: Course[];
    _purchaseList?: Purchase[];

    constructor(id: number, accountName: string, password: string, createDate: string,
        favouriteList?: Course[], purchaseList?: Purchase[]) {
        this._id = id;
        this._accountName = accountName;
        this._password = password;
        this._createDate = createDate;
        this._favouriteList = favouriteList;
        this._purchaseList = purchaseList;
    }
};

const rawAccountMockData: Account[] = [
    new Account(1, "mrdoc", "123", "2025-07-10T12:00:00", [], []),
    new Account(2, "fakeAdmin", "123", "2025-07-10T12:00:00", [], []),
    new Account(3, "unknown", "123", "2025-07-10T12:00:00", [], []),
    new Account(4, "Pasechaser", "123", "2025-07-10T12:00:00", [], []),
    new Account(5, "CrusaderAndTheHolly", "123", "2025-07-10T12:00:00", [], []),
];

//Update Account mock records's properties
export function accountMockData(): Account[] {
    const accountList: Account[] = rawAccountMockData;
    const purchaseList: Purchase[] = purchaseMockData();

    accountList.forEach((account) => {
        //Update purchaseList property
        if (account._purchaseList == null) {
            account._purchaseList = purchaseList.filter((purchase) => purchase._accountId === account._id);
        }
    });

    return accountList;
};