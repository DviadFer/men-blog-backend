const express = require('express') //hace uso del paquete express instalado con npm

const app = express() //llama a la función express para empezar una nueva app Express.

app.listen(3000, ()=>{
    console.log('Aplicación creada a traves de Express con puerto 3000')
}) 

/**
 * Express se hace cargo del paquete http para gestionar  los objectos request y response. 
 * La función callback en este caso, se incluye como segundo argumento de la función app.listen() cuando se inicia
 * el servidor. 
 */