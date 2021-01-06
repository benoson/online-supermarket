let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getTotalOrdersAmount = async () => {

    // Creating an SQL query for inserting a new user to the DB
    const SQL = `SELECT COUNT(Order_ID) as totalOrdersAmount from orders`;
    
    try {
        // Sending the SQL query to the 'connection wrapper' preset
        const totalOrdersAmount = await connection.execute(SQL);
        return totalOrdersAmount[0].totalOrdersAmount;
    }
    
    catch (error) {
        
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getTotalOrdersAmount
}