const { Server } = require('http');
const productsDao = require('../dao/productsDao');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');
const ProductsUtils = require('../utils/ProductUtils');
const UsersUtils = require('../utils/UsersUtils');

const getAllProducts = async () => {
    const allProducts = await productsDao.getAllProducts();
    return allProducts;
}

const updateProduct = async (request, updatedProduct, productID) => {
    ProductsUtils.validateProductData(updatedProduct);

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userType = userCacheData.userType;

    if (userType === "ADMIN") {
        await productsDao.updateProduct(updatedProduct, productID);
    }
    else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}

const addProduct = async (request, newProduct) => {
    // ProductsUtils.validateProductData(newProduct);
    
    const file = request.file;
    console.log(file.filename);

    // if (!file) {
    //     const error = new ServerError(ErrorType.INVALID_PRODUCT_IMAGE_URL);
    //     error.httpStatusCode = 400;
    //     return next(error);
    // }


    // const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    // const userType = userCacheData.userType;

    // if (userType === "ADMIN") {
    //     await productsDao.updateProduct(updatedProduct, productID);
    // }
    // else {
    //     throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    // }
}


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}