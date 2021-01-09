let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getAllProducts = async () => {

    // Creating an SQL query to get all products from the DB
    const SQL = "SELECT Product_ID as ID, Product_Name as name, (SELECT Category_Name FROM `online-supermarket`.`products-categories` WHERE `online-supermarket`.`products-categories`.Category_ID = ID) as category, Product_Price as price, Product_Image_URL as imageURL FROM products";
    
    try {
        // Sending the SQL query to the 'connection wrapper' preset
        const allProducts = await connection.execute(SQL);
        return allProducts;
    }
    
    catch (error) {
        
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getAllProducts
}