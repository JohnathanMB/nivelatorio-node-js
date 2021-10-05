'use strict'

const express = require('express');
const api = require('./routes/ApiProduct')

const app = express();

app.use(express.urlencoded({extended: false})); // agregamos metodos para parsera url
app.use(express.json()); // poder usar formatos json
app.use('/api/product', api);

module.exports = app;