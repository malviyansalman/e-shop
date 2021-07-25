const path = require('path');
const auth = require('../middleware/auth')
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',auth,adminController.getAddProduct);
// // /admin/products => GET
router.get('/products',auth,adminController.getProducts)
// // /admin/add-product => POST
router.post('/add-product',auth, adminController.postAddProduct);

router.get('/edit-product/:productId',auth,adminController.getEditProduct)

router.post('/edit-product',auth,adminController.postEditProduct)

router.get('/delete-product/:productId',auth,adminController.getdeleteProduct)
module.exports = router;
