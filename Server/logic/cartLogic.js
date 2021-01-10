const cartDao = require('../dao/cartDao');
const UsersUtils = require('../utils/UsersUtils');


const getCurrentCartItems = async (request) => {

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfulCurrentCartItemsData = await cartDao.getCurrentCartItems(userID);
    return successfulCurrentCartItemsData;
}

const getCustomerCurrentCartOpenDate = async (request) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfulCurrentCartCreationDate = await cartDao.getCustomerCurrentCartOpenDate(userID);
    return successfulCurrentCartCreationDate;
}


module.exports = {
    getCurrentCartItems,
    getCustomerCurrentCartOpenDate
}