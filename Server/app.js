const express = require('express');
const cors = require('cors');

const usersController = require('./controllers/usersController');


// creating an Express application
const server= express();

// using Cors on port 4200 (Angular's port)
server.use(cors({origin: "http://localhost:4200"}));

server.use('/users', usersController);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});