const express = require('express');
const router = express.Router();

const usersLogic = require('../logic/usersLogic');


// ----- Handling the requests related to the user

router.post('/register', async (request, response, next) => {

    console.log("aaaa");
    // Extracting the user's info from the request's body
    const userInfo = request.body;

    try {

        const successfullLoginData = await usersLogic.addUser(userInfo);

        // convert the response (Token, userType & userName) to JSON before sending it to the client
        response.json(successfullLoginData);
    }

    catch (error) {
                
        // Handling the error with our Error Handler
        return next(error);
    }
});