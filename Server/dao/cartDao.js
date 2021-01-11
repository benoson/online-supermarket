let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");



const getCurrentCartItems = async (userID) => {
    
    // Creating the SQL query to get the user from the DB
    // attempting to get the current cart items of the user

    const SQL = "SELECT c.Item_ID as itemID, c.Product_ID as productID, c.Amount as amount, c.Total_Price as totalPrice, s.Cart_ID as cartID FROM `shopping-carts` s LEFT JOIN `cart-items` c ON s.Cart_ID = c.Cart_ID WHERE s.Cart_Owner = ? AND s.Is_Open = '1'";
    const parameter = [userID];

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        const customerCurrentCartItems = await connection.executeWithParameters(SQL, parameter);
        // returning all current cart items of the customer
        return customerCurrentCartItems;
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const getCustomerCurrentCartCreationDate = async (userID) => {

    // Creating the SQL query to get the user from the DB
    const SQL = "SELECT DATE_FORMAT(Cart_Creation_Date, '%d/%m/%Y') as cartCreationDate FROM `shopping-carts` WHERE Cart_Owner = ? AND Is_Open = '1'";
    const parameter = [userID];

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        const successfulCurrentCartCreationDate = await connection.executeWithParameters(SQL, parameter);
        if (successfulCurrentCartCreationDate.length === 0) {
            return null;
        }
        // returning current cart creation date of the customer
        return successfulCurrentCartCreationDate[0].cartCreationDate;
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const addItemToCart = async (userID, newCartItem) => {

    // Creating the SQL query to get the user from the DB
    const SQL = "INSERT INTO `cart-items` (Product_ID, Amount, Total_Price, Cart_ID) VALUES(?, ?, ((SELECT Product_Price FROM products WHERE Product_ID = ?) * ?), (SELECT Cart_ID FROM `shopping-carts` WHERE Cart_Owner = ?))";
    const parameter = [newCartItem.productID, newCartItem.quantity, newCartItem.productID, newCartItem.quantity, userID];

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameter);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const updateCartItem = async (userID, updatedCartItem) => {

    // Creating the SQL query to get the user from the DB
    // updating the amount of  the item that the client has changed

    const SQL = "UPDATE `cart-items` SET Amount = ?, Total_Price = ((SELECT Product_Price FROM products WHERE Product_ID = ?) * ?), Cart_ID = (SELECT Cart_ID FROM `shopping-carts` WHERE Cart_Owner = ?) WHERE Product_ID = ?";
    const parameter = [updatedCartItem.quantity, updatedCartItem.productID, updatedCartItem.quantity, userID, updatedCartItem.productID];

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameter);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getCurrentCartItems,
    getCustomerCurrentCartCreationDate,
    addItemToCart,
    updateCartItem
}