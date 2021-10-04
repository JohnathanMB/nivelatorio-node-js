'use strict'

const express = require('express');
const ProductController = require('./controllers/Product');

const app = express();

app.use(express.urlencoded({extended: false})); // agregamos metodos para parsera url
app.use(express.json()); // poder usar formatos json

app.get('/api/product', ProductController.getProducts);
app.get('/api/product/:productId', ProductController.getProduct)
app.post('/api/product', ProductController.saveProduct)
app.put('/api/product', ProductController.updateProduct)
app.delete('/api/product', ProductController.deleteProduct)


module.exports = app;