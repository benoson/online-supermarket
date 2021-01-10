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
    const succesfulItemAdditionResponse = await cartDao.addItemToCart(userID, newCartItem);
    return succesfulItemAdditionResponse;
}


module.exports = {
    getCurrentCartItems,
    getCustomerCurrentCartCreationDate,
    addItemToCart
}