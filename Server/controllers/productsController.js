const express = require('express');
const router = express.Router();

const productsLogic = require('../logic/usersLogic');


// ----- Handling the requests related to the products

router.post('/', async (request, response, next) => {

    try {
        const successfullProductsData = await productsLogic.getAllProducts();

        // converting the response to JSON before sending it to the client
        response.json(successfullProductsData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

module.exports = router;