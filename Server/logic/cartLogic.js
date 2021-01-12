const { request } = require('http');
const cartDao = require('../dao/cartDao');
const UsersUtils = require('../utils/UsersUtils');


const getCurrentCartItems = async (request) => {

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfulCurrentCartItemsData = await cartDao.getCurrentCartItems(userID);
    return successfulCurrentCartItemsData;
}

const getCustomerCurrentCartCreationDate = async (request) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfulCurrentCartCreationDate = await cartDao.getCustomerCurrentCartCreationDate(userID);
    return successfulCurrentCartCreationDate;
}

const addItemToCart = async (request, newCartItem) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.addItemToCart(userID, newCartItem);
}

const updateCartItem = async (request, updatedCartItem) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.updateCartItem(userID, updatedCartItem);
}

const removeCartItem = async (request, cartItemID) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.removeCartItem(userID, cartItemID);
}

const removeAllCartItems = async (request) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.removeAllCartItems(userID);
}


module.exports = {
    getCurrentCartItems,
    getCustomerCurrentCartCreationDate,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    removeAllCartItems
}