export class PurchaseItem {
    _id: number;
    _purchaseId: number;
    _courseId: number;

    constructor(
        id: number, purchaseId: number, courseId: number
    ) {
        this._id = id;
        this._purchaseId = purchaseId;
        this._courseId = courseId;
    }
};

export const purchaseItemMockData = [
    new PurchaseItem(1, 1, 2),
    new PurchaseItem(2, 1, 5),
    new PurchaseItem(3, 1, 9),
    new PurchaseItem(4, 2, 1),
    new PurchaseItem(5, 2, 10),
    new PurchaseItem(6, 3, 5),
    new PurchaseItem(7, 4, 4),
    new PurchaseItem(8, 4, 7),
    new PurchaseItem(9, 4, 9),
    new PurchaseItem(10, 5, 5)
];