const ServerError = require('../errors/ServerError');
const ErrorType = require('../errors/errorType');

class ProductsUtils {
    constructor() {}

    // ----- product validations

    static validateProductData = (orderDetails) => {
        ProductsUtils.validateProductName(orderDetails.name);
        ProductsUtils.validateProductCategory(orderDetails.category);
        ProductsUtils.validateProductDescription(orderDetails.description);
        ProductsUtils.validateProductPrice(orderDetails.price);
        ProductsUtils.validateProductImage(orderDetails.imageURL);

        return true;
    }

    static validateProductName = (productName) => {
        if (typeof productName === "string") {
            if (productName.trim() !== "") {
                return true;
            }
        }
        throw new ServerError(ErrorType.INVALID_PRODUCT_NAME);
    }

    static validateProductCategory = (productCategory) => {
        if (typeof productCategory === "string") {
            const productCategoryTrimmed = productCategory.trim();
            if (productCategoryTrimmed === "Dairy" || productCategoryTrimmed === "Meat & Fish" || productCategoryTrimmed === "Vegan" || productCategoryTrimmed === "Drinks" || productCategoryTrimmed === "Health") {
                return true;
            }
        }
        throw new ServerError(ErrorType.INVALID_PRODUCT_CATEGORY);
    }

    static validateProductDescription = (productDescription) => {
        if (typeof productDescription === "string") {
            const productDescriptionTrimmed = productDescription.trim();
            if (productDescriptionTrimmed !== "") {
                return true;
            }
        }
        throw new ServerError(ErrorType.INVALID_PRODUCT_DESCRIPTION);
    }

    static validateProductPrice = (productPrice) => {
        if (typeof +productPrice === "number") {
            if (productPrice > 0) {
                return true;
            }
        }
        throw new ServerError(ErrorType.INVALID_PRODUCT_PRICE);
    }

    static validateProductImage = (imageURL) => {
        if (typeof imageURL === "string") {
            const imageURLTrimmed = imageURL.trim();
            if (imageURLTrimmed !== "") {
                const splitImageURL = imageURL.split(".");

                // checking for the file extension, if it is not an image, throw an error and do not valdiate the product
                if (splitImageURL[splitImageURL.length - 1] == "jpg" || splitImageURL[splitImageURL.length - 1] == "jpeg" || splitImageURL[splitImageURL.length - 1] == "png") {
                    return true;
                }
            }
        }
        throw new ServerError(ErrorType.INVALID_PRODUCT_IMAGE);
    }
}

module.exports = ProductsUtils;