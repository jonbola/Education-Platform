import { Account, accountMockData } from "./account";
import { Course, courseMockData } from "./course";
import { PurchaseItem, purchaseItemMockData } from "./purchase-Item";

export class Purchase {
    _id: number;
    _totalPrice: number;
    _purchaseDate: string;
    _itemList: PurchaseItem[];
    _accountId: number;

    constructor(
        id: number, totalPrice: number, purchaseDate: string,
        itemList: PurchaseItem[], accountId: number
    ) {
        this._id = id;
        this._totalPrice = totalPrice;
        this._purchaseDate = purchaseDate;
        this._itemList = itemList;
        this._accountId = accountId;
    }
};

const rawPurchaseMockData: Purchase[] = [
    new Purchase(1, 0, "2025-07-10T12:00:00", [], 1),
    new Purchase(2, 0, "2025-07-10T12:00:00", [], 1),
    new Purchase(3, 0, "2025-07-10T12:00:00", [], 3),
    new Purchase(4, 0, "2025-07-10T12:00:00", [], 4),
    new Purchase(5, 0, "2025-07-10T12:00:00", [], 5)
];

//Update Purchase records's properties
export function purchaseMockData(): Purchase[] {
    const purchaseList: Purchase[] = rawPurchaseMockData;
    const courseList: Course[] = courseMockData;
    const purchaseItemList: PurchaseItem[] = purchaseItemMockData;

    purchaseList.forEach((purchase) => {
        //Update totalPrice property
        if (purchase._totalPrice == null || purchase._totalPrice === 0) {
            const totalPrice = purchaseItemList.reduce((sum, item) => {
                const course = courseList.find((course) => course._id == item._courseId);

                return item._purchaseId === purchase._id ?
                    sum + (course?._price??0)
                    :
                    sum;
            }, 0);

            purchase._totalPrice += totalPrice;
        }

        //Update itemList property
        if (purchase._itemList == null) {
            purchase._itemList = purchaseItemList.filter((item) => item._purchaseId === purchase._id);
        }
    });

    return purchaseList;
}