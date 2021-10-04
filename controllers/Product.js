'use strict'

const Product = require('../models/Product');

//Creamos 3 objetos de tipo producto y los agregamos a un array llamado products
let producto1 = new Product("001", "Los Jordans del centro", 100000);
let producto2 = new Product("002", "Camisa Gushi del centro", 20000);
let producto3 = new Product("003", "Yoger fachero facherito", 50000);

let products = [producto1, producto2, producto3];

function getProducts(req, res){
    res.status(200).send({products})
}

function getProduct(req, res){
    console.log('GET api/product');
    let productIdParam = req.params.productId;
    try{
        let indexProduct = products.findIndex(productItem => productItem.productId == productIdParam);
        if(indexProduct != -1){
            let productAMostrar = products[indexProduct];
            res.status(200).send({productAMostrar});
        }else{
            res.status(400).send({message: 'El producto no se encuentra registrado'})
        }
    }catch (error){
        console.log(error);
        res.status(500).send({message: "HA OCURRIDO UN ERROR EN EL SERVIDOR"});
    }
}

function saveProduct(req, res){
    console.log('POST api/product');
    let body= req.body;
    try{
        let product = new Product();
        product.productId = body.productId;
        product.nombre = body.nombre;
        product.precioUnitario = parseInt(body.precioUnitario, 10);

        if(products.findIndex(productItem => productItem.productId == product.productId) == -1){
            products.push(product);
            res.status(200).send({message: 'El producto se registró satisfactoriamente', products})
        }else{
            res.status(400).send({message: 'El producto ya se encuentra registrado'})
        }
    }catch (error){
        console.log(error);
        res.status(500).send({message: "HA OCURRIDO UN ERROR EN EL SERVIDOR"});
    }
}

function updateProduct(req, res){
    console.log('PUT api/product');
    let body= req.body;
    try{
        let productReq = new Product();
        productReq.productId = body.productId;
        productReq.nombre = body.nombre;
        productReq.precioUnitario = parseInt(body.precioUnitario, 10);

        let indexProduct = products.findIndex(productItem => productItem.productId == productReq.productId);
        if(indexProduct != -1){
            let productActualizado = products[indexProduct];
    
            productActualizado.nombre = productReq.nombre;
            productActualizado.precioUnitario = productReq.precioUnitario;

            products[indexProduct] = productActualizado;
            res.status(200).send({message: `El produco se actualizó correctamente`, 'product': productActualizado});
        }else{
            res.status(400).send({message: 'El producto no se encuentra registrado'})
        }
    }catch (error){
        console.log(error);
        res.status(500).send({message: "HA OCURRIDO UN ERROR EN EL SERVIDOR"});
    }
}

function deleteProduct(req, res){
    console.log('DELETE api/product');
    let body= req.body;
    try{
        let productReq = new Product();
        productReq.productId = body.productId;
        productReq.nombre = body.nombre;
        productReq.precioUnitario = parseInt(body.precioUnitario, 10);

        let indexProduct = products.findIndex(productItem => productItem.productId == productReq.productId);
        if(indexProduct != -1){
            products.splice(indexProduct, 1);
            res.status(200).send({message: `El producto se eliminó correctamente`, products});
        }else{
            res.status(400).send({message: 'El producto no se encuentra registrado'})
        }
    }catch (error){
        console.log(error);
        res.status(500).send({message: "HA OCURRIDO UN ERROR EN EL SERVIDOR"});
    }
}

module.exports= {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}