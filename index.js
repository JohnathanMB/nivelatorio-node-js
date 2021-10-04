'use strict'


const app = require('./app');
const port = process.env.PORT || 3001;


app.listen(port, ()=> {
    console.log(`Dirname: ${__dirname}`);
    console.log(`Api Rest corriendo en http://localhost:${port}`)
})