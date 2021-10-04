'use strict'

//creación de 'clase' Producto
module.exports = class Product {
    constructor(productId, nombre, precioUnitario) {
        this.productId = productId;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
    }
}
