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
    newProduct.imageURL = 'http://localhost:3001/' + newProduct.imageURL
    newProduct.name = newProduct.name.toUpperCase();
    ProductsUtils.validateProductData(newProduct);
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userType = userCacheData.userType;

    if (userType === "ADMIN") {
        console.log("all good");
        await productsDao.addProduct(newProduct);
    }
    else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}