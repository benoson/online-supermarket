const express = require('express');
const router = express.Router();

const ordersLogic = require('../logic/ordersLogic');


// ----- Handling the requests related to the orders

router.get('/totalAmount', async (request, response, next) => {

    try {
        const successfullOrdersAmountData = await ordersLogic.getTotalOrdersAmount();

        // converting the response to JSON before sending it to the client
        response.json(successfullOrdersAmountData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.get('/lastOrderDate', async (request, response, next) => {

    try {
        const successfullLastOrderDateData = await ordersLogic.getLastOrderDateByOwner(request);

        console.log(successfullLastOrderDateData);
        // converting the response to JSON before sending it to the client
        response.json(successfullLastOrderDateData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;