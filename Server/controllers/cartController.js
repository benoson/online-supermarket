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

router.get('/openDate', async (request, response, next) => {
    try {
        const successfulCurrentCartCreationDate = await cartLogic.getCustomerCurrentCartOpenDate(request);

        // converting the response to JSON before sending it to the client
        response.json(successfulCurrentCartCreationDate);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;