const productsDao = require('../dao/productsDao');


const getAllProducts = async () => {
    const allProducts = await productsDao.getAllProducts();
    return allProducts;
}


module.exports = {
    getAllProducts
}