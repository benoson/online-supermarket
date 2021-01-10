const expressJwt = require('express-jwt');
const config = require('../config/config.json');

// Extracting the text from the secret's JSON
let { secret } = config;


// -------------------- Defining The Login Filter -------------------- //

function authenticateJwtRequestToken() {

    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/welcome/login',
            '/welcome/register'
        ]
    });
}

module.exports = authenticateJwtRequestToken;