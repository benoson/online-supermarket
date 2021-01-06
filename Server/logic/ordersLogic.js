const ordersDao = require('../dao/ordersDao');


const getTotalOrdersAmount = async () => {
    const totalOrdersAmount = await ordersDao.getTotalOrdersAmount();
    return totalOrdersAmount;
}


module.exports = {
    getTotalOrdersAmount
}