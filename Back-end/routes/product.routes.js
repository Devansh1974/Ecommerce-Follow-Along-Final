const multer = require('multer');
const upload = multer({ dest: 'temp-uploads/' });
const express = require('express');
const {
    createProductController,
    getProductDataController,
    updateProductController,
    getSinglePRoductDocumentController,
    deleteSingleProduct,
} = require('../controller/product.controller');
const router = express.Router();

// Existing POST route for creating a product
router.post('/create-product',
    upload.array('files', 5),
    createProductController
);

// New POST endpoint to create a product
router.post('/products', createProductController);

router.get('/get-products', getProductDataController);
router.put("/update-products",
    upload.array('files', 5),
    updateProductController
);

router.get('/get-single/:id', getSinglePRoductDocumentController);
router.delete('/:id', deleteSingleProduct);

module.exports = router;
