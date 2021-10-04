'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3001

app.use(express.urlencoded({extended: false})); // agregamos metodos para parsera url
app.use(express.json()); // poder usar formatos json

//creación de 'clase' Producto
function Product(productId, nombre, precioUnitario){
    this.productId = productId;
    this.nombre = nombre;
    this.precioUnitario = precioUnitario;
}

//Creamos 3 objetos de tipo producto y los agregamos a un array llamado products
let producto1 = new Product("001", "Los Jordans del centro", 100000);
let producto2 = new Product("002", "Camisa Gushi del centro", 20000);
let producto3 = new Product("003", "Yoger fachero facherito", 50000);

let products = [producto1, producto2, producto3];

app.get('/hola/', (req, res)=>{
    res.send({message: `Hola Mundo`});
})

app.get('/hola/:name', (req, res)=>{
    res.send({message: `Hola ${req.params.name}`});
})

app.get('/api/product', (req, res)=>{
    res.send(200, {products})
})

app.get('/api/product/:productId', (req, res)=>{
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
})

app.post('/api/product', (req, res)=>{
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
})

app.put('/api/product', (req, res)=>{
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
})

app.delete('/api/product', (req, res)=>{
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
})

app.listen(port, ()=> {
    console.log(`Dirname: ${__dirname}`);
    console.log(`Api Rest corriendo en http://localhost:${port}`)
})