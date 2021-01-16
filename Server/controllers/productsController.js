const express = require('express');
const router = express.Router();

const productsLogic = require('../logic/productsLogic');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, Date.parse(new Date()) + `_${file.originalname}`);
    }
})
const upload = multer( { storage: storage });


// ----- Handling the requests related to the products

router.get('/', async (request, response, next) => {

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

router.post("/", upload.single('file'), async (request, response, next) => {

    const newProduct = request.body;
    console.log(newProduct);

    try {
        const successfullNewProductData = await productsLogic.addProduct(request, newProduct);

        // converting the response to JSON before sending it to the client
        response.json(successfullNewProductData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.patch('/:id', async (request, response, next) => {

    const productID = request.params.id;
    const updatedProduct = request.body;

    try {
        const succesfullProductUpdateData = await productsLogic.updateProduct(request, updatedProduct, productID);

        // converting the response to JSON before sending it to the client
        response.json(succesfullProductUpdateData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;