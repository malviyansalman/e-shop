const path = require('path');

const express = require('express');
const auth = require('../middleware/auth')
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProducts);

router.get('/products',shopController.getProducts)

router.get('/products/:productId',shopController.getProduct)

router.get('/cart',auth,shopController.getCart)

router.post('/cart',auth,shopController.postCart)

router.post('/cart-delete-item',auth,shopController.postCartDeleteItem)

router.get('/orders',auth,shopController.getOrders)

router.post('/create-order',auth,shopController.postOrder)

module.exports = router;





