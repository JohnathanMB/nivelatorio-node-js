'use strict'

const express = require('express');
const ProductController = require('../controllers/Product');

const api = express.Router();

api.get('/', ProductController.getProducts);
api.get('/:productId', ProductController.getProduct)
api.post('/', ProductController.saveProduct)
api.put('/', ProductController.updateProduct)
api.delete('/', ProductController.deleteProduct)

module.exports = api;