import { ImageSourcePropType } from "react-native";

export class Course {
    _id: number;
    _name: string;
    _price: number;
    _image: ImageSourcePropType;
    _type: string[];
    _createDate: string;
    _sale: number;
    _shortDescription?: string;
    _longDescription?: string;

    constructor(
        id: number, name: string, price: number,
        image: ImageSourcePropType, type: string[], createDate: string,
        sale: number, shortDescription?: string, longDescription?: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._image = image;
        this._type = type;
        this._createDate = createDate;
        this._sale = sale;
        this._shortDescription = shortDescription;
        this._longDescription = longDescription;
    }
};

export const courseMockData: Course[] = [
    new Course(1, "English for Beigner", 10, require("@/assets/images/products/img_product_english_for_beginner.png"), ["english", "document", "short", "language"], "2025-07-10T12:00:00", 1020, "Learning basic English", "In this course, you will learn every basics of English from reading to speaking"),
    new Course(2, "Advanced English", 15, require("@/assets/images/products/img_product_advanced_english.png"), ["english", "document", "long", "language"], "2025-07-10T12:00:00", 5020, "Learning English with experts", "In this course, you will learn advanced English, improve your four skills"),
    new Course(3, "Basic Computer Science", 12, require("@/assets/images/products/img_product_basic_computer_science.png"), ["english", "document", "short", "it"], "2025-07-10T12:00:00", 100, "Basic knowledges about Computer Science", "Computer Science is not for everyone, but you are willing to learn then this course is for you"),
    new Course(4, "Data Structures and Algorithms", 15, require("@/assets/images/products/img_product_data_structures_and_algorithms.png"), ["english", "document", "long", "it"], "2025-07-10T12:00:00", 2000, "Knowledge for solving problems with data", "You will learn how data can be stored in different structures and solving data problems"),
    new Course(5, "Survive Outer", 20, require("@/assets/images/products/img_product_survive_outer.png"), ["english", "guide", "long", "survival"], "2025-07-10T12:00:00", 150, "Wildlife is tough unless survival knowledge gained!", "You will learn how to survive in a tough situation or lost in the wood. Learn to use many essential tools to keep you safe"),
    new Course(6, "Master Western Cuisine", 35, require("@/assets/images/products/img_product_master_western_cuisine.png"), ["english", "guide", "long", "cooking"], "2025-07-10T12:00:00", 254, "Western cuisine knowledges are condensed in this course", "Culture is a great invention for people to learn and feel. Western culture is easy to approach and we will start with their cuisine"),
    new Course(7, "Ingredients and Chemistry", 20, require("@/assets/images/products/img_product_ingredients_and_chemistry.png"), ["english", "guide", "long", "cooking"], "2025-07-10T12:00:00", 560, "It is all about cuisine ingredients and chemistry", "Learning basic cuisine ingredients and how to achieve the best smell and taste through chemistry"),
    new Course(8, "Resources Management", 20, require("@/assets/images/products/img_product_resources_management.png"), ["english", "document", "long", "management"], "2025-07-10T12:00:00", 125, "Manage many kind of resources from all the world", "Learning how to manage every resources from natural resources to human resources"),
    new Course(9, "Spanish for Beginner", 10, require("@/assets/images/products/img_product_spanish_for_beginner.png"), ["english&spanish", "document", "short", "language"], "2025-07-10T12:00:00", 530, "Learning basic Spanish", "In this course, you will learn basics from Spanish"),
    new Course(10, "Japanese for Beginner", 14, require("@/assets/images/products/img_product_japanese_for_beginner.png"), ["english&japanese", "document", "short", "language"], "2025-07-10T12:00:00", 621, "Learing basic Japanese", "In this course, you will learn basics from Japanese"),
];