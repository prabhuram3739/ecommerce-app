const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', authenticate, createProduct);

module.exports = router;
