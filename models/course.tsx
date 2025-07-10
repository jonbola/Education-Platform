export class Course {
    _id: number;
    _name: string;
    _price: number;
    _type: string[];
    _createDate: string;
    _images?: string[];
    _description?: string;

    constructor(id: number, name: string, price: number, type: string[], createDate: string, images: string[], description: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._type = type;
        this._createDate = createDate;
        this._images = images;
        this._description = description;
    }
}

const mockData: Course[] = [
    new Course(1, "English for Beigner", 10, ["english", "document", "short", "language"], "2025-07-10T12:00:00", [], "Learning basic English"),
    new Course(2, "Advanced English", 15, ["english", "document", "long", "language"], "2025-07-10T12:00:00", [], "Learning English with experts"),
    new Course(3, "Basic Computer Science", 12, ["english", "document", "short", "it"], "2025-07-10T12:00:00", [], "Basic knowledges about Computer Science"),
    new Course(4, "Data Structures and Algorithms", 15, ["english", "document", "long", "it"], "2025-07-10T12:00:00", [], "Learning how data can be stored in different structures and solving data problems"),
    new Course(5, "Survive Outer", 20, ["english", "guide", "long", "survival"], "2025-07-10T12:00:00", [], "Wildlife is tough unless survival knowledge gained!"),
    new Course(6, "Master Western Cuisine", 35, ["english", "guide", "long", "cooking"], "2025-07-10T12:00:00", [], "Western cuisine knowledges are condensed in this course"),
    new Course(7, "Ingredients and Chemistry", 20, ["english", "guide", "long", "cooking"], "2025-07-10T12:00:00", [], "Learning basic cuisine ingredients and how to achieve the best smell and taste through chemistry"),
    new Course(8, "Resources Management", 20, ["english", "document", "long", "management"], "2025-07-10T12:00:00", [], "Learning how to manage every resources from natural resources to human resources"),
    new Course(9, "Spanish for Beginer", 10, ["english&spanish", "document", "short", "language"], "2025-07-10T12:00:00", [], "Learning basic Spanish"),
    new Course(10, "Japanese for Beginer", 14, ["english&japanese", "document", "short", "language"], "2025-07-10T12:00:00", [], "Learing basic Japanese"),
];