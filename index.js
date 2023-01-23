//Require, similar a import o include, para incluir paquetes de node. Se pasa el nombre del paquete como una string
const http = require('http') // Este paquete sirve para manejar req y res de http y realizar acciones en el server.
const fs = require('fs') //Este paquete nos permite interactuar con archivos de nuestro servidor. File System

// Usamos el paquete fs con el metodo readFile para cargar los html en variables
const homePage = fs.readFileSync('./html/index.html')
const aboutPage = fs.readFileSync('./html/about.html')
const contactPage = fs.readFileSync('./html/contact.html')
const notFoundPage = fs.readFileSync('./html/notfound.html')

/**
 * @name RequestHandler
 * Función callback. Espera una request y enviará la repsuesta sólo cuando la reciba.
 * En este caso sacará por consola en noe la url de la request e imprimira texto en la web como respuesta.
 * Todas las APIs node tiene una request handler core
 */
const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === '/') {
        res.end(homePage)
    } else if (req.url === '/about') {
        res.end(aboutPage)
    } else if (req.url === '/contact') {
        res.end(contactPage)
    } else {
        /**
         * Escribe el status de la request. 
         * Se puede ver desde el Network del Inspeccionar del navegador. Por defecto es 200.
         */
        res.writeHead(404)
        res.end(notFoundPage)
    }
    
})

server.listen(3000) //Puerto de escucha