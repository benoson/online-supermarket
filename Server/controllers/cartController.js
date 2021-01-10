const express = require('express');
const router = express.Router();

const cartLogic = require('../logic/cartLogic');


// ----- Handling the requests related to the orders

router.get('/currentItems', async (request, response, next) => {

    try {
        const successfulCurrentCartItemsData = await cartLogic.getCurrentCartItems(request);

        // converting the response to JSON before sending it to the client
        response.json(successfulCurrentCartItemsData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.get('/creationDate', async (request, response, next) => {
    try {
        const successfulCurrentCartCreationDate = await cartLogic.getCustomerCurrentCartCreationDate(request);

        // converting the response to JSON before sending it to the client
        response.json(successfulCurrentCartCreationDate);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.post('/addItem', async (request, response, next) => {

    const newCartItem = request.body;

    try {
        const succesfulItemAdditionResponse = await cartLogic.addItemToCart(request, newCartItem);

        // converting the response to JSON before sending it to the client
        response.json(succesfulItemAdditionResponse);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;