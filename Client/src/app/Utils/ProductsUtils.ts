import Product from "../models/Product";

export default class ProductsUtils {
    constructor() {}

    // ----- product validations

    static validateProductData = (orderDetails: Product) => {
        ProductsUtils.validateProductName(orderDetails.name);
        ProductsUtils.validateProductCategory(orderDetails.category);
        ProductsUtils.validateProductDescription(orderDetails.description);
        ProductsUtils.validateProductPrice(orderDetails.price);

        return true;
    }

    static validateProductName = (productName: string) => {
        if (productName.trim() !== "") {
            return true;
        }
        throw Error("Invalid product name, must not be empty");
    }

    static validateProductCategory = (productCategory: string) => {
        const productCategoryTrimmed = productCategory.trim();
        if (productCategoryTrimmed === "Dairy" || productCategoryTrimmed === "Meat & Fish" || productCategoryTrimmed === "Vegan" || productCategoryTrimmed === "Drinks" || productCategoryTrimmed === "Health") {
            return true;
        }
        throw Error("Invalid category, please choose one of the defaults");
    }

    static validateProductDescription = (productDescription: string) => {
        const productDescriptionTrimmed = productDescription.trim();
        if (productDescriptionTrimmed !== "") {
            return true;
        }
        throw Error("Invalid description, must not be empty");
    }

    static validateProductPrice = (productPrice: number) => {
        if (productPrice > 0) {
            return true;
        }
        throw Error("Invalid price, must be larger than 0");
    }
}