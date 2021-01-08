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

const getLastOrderDateByOwner = async (ID) => {
    
    // Creating the SQL query to get the user from the DB
    const SQL = "SELECT DATE_FORMAT(Order_Date, '%d/%m/%Y') as lastOrderDate FROM orders WHERE Order_Owner = ? ORDER BY Order_Date DESC LIMIT 1";
    const parameter = [ID];
    let ownerLastOrderDate;

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        ownerLastOrderDate = await connection.executeWithParameters(SQL, parameter);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    // If the the customer does not have a previous order
    if (ownerLastOrderDate === null || ownerLastOrderDate.length === 0) {
        return null;
    }

    // returning the last order date of the customer
    return ownerLastOrderDate[0];
}


module.exports = {
    getTotalOrdersAmount,
    getLastOrderDateByOwner
}