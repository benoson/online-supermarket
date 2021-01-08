const ordersDao = require('../dao/ordersDao');
const UsersUtils = require('../utils/UsersUtils');


const getTotalOrdersAmount = async () => {
    const totalOrdersAmount = await ordersDao.getTotalOrdersAmount();
    return totalOrdersAmount;
}

const getLastOrderDateByOwner = async (request) => {

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfullLastDateResponse = await ordersDao.getLastOrderDateByOwner(userID);
    if (successfullLastDateResponse === null) {
        return null;
    }
    const successfullLastDateData = successfullLastDateResponse.lastOrderDate;
    return successfullLastDateData;
}


module.exports = {
    getTotalOrdersAmount,
    getLastOrderDateByOwner
}