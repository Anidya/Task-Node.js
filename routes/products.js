const express = require('express');
const { addProduct, updateProduct, deleteProduct, userById, productById } = require('../controllers/products');
const router= express.Router();


router.post('/addProduct/userId', addProduct);
router.put('/updateProduct/userId', updateProduct);
router.delete('/deleteProduct/userId', deleteProduct);


router.get('/allProducts', getProducts);


router.param("userId",userById)
router.param("productId",productById)


module.exports = router;