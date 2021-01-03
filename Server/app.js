const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');

const usersController = require('./controllers/usersController');


// creating an Express application
const server = express();

// express.json() is parsing the requests recieved to the server side
server.use(express.json());

// using Cors on port 4200 (Angular's port)
server.use(cors({origin: "http://localhost:4200"}));

server.use('/users', usersController);
server.use('/users', usersController);

// Registering the use of our Error Handler
server.use(errorHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});