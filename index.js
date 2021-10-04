'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false}))
app.use(express.json)

app.get('/hola', (req, res)=>{
    res.send({message: `Hola `});
})

app.listen(port, ()=> {
    console.log(`Dirname: ${__dirname}`);
    console.log(`Api Rest corriendo en http://localhost:${port}`)
})