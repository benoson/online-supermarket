let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getAllProducts = async () => {

    // Creating an SQL query to get all products from the DB
    const SQL = "SELECT Product_ID as ID, Product_Name as name, Product_Description as description, (SELECT Category_Name FROM `products-categories` WHERE `products-categories`.Category_ID = `products`.Product_Category) as category, Product_Price as price, Product_Image_URL as imageURL FROM products";
    
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

const updateProduct = async (updatedProduct, productID) => {
    // Creating an SQL query to update a product in the DB
    const SQL = "UPDATE products SET Product_Name = ?, Product_Description = ?, Product_Category = (SELECT Category_ID FROM `products-categories` WHERE Category_Name = ?), Product_Price = ?, Product_Image_URL = ? WHERE Product_ID = ?";
    const parameters = [updatedProduct.name, updatedProduct.description, updatedProduct.category, updatedProduct.price, updatedProduct.imageURL, productID]

    try {
        // Sending the SQL query to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameters);
    }
    
    catch (error) {
        // Technical Error
        console.log(error);
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const addProduct = async (newProduct) => {
    // Creating an SQL query to add a product to the DB
    const SQL = "INSERT INTO products (Product_Name, Product_Description, Product_Category, Product_Price, Product_Image_URL) VALUES (?, ?, (SELECT Category_ID FROM `products-categories` WHERE Category_Name = ?), ?, ?)";
    const parameters = [newProduct.name, newProduct.description, newProduct.category, newProduct.price, newProduct.imageURL]

    try {
        // Sending the SQL query to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameters);
    }

    catch (error) {
        // Technical Error
        console.log(error);
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}