const http = require('http') //Require, similar a import o include, para incluir paquetes de node. Se pasa el nombre del paquete como una string
/**
 * Función callback. Espera una request y enviará la repsuesta sólo cuando la reciba.
 * En este caso sacará por consola en noe la url de la request e imprimira texto en la web como repsuesta.
 */
const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === '/') {
        res.end('This is the home page')
    } else if (req.url === '/about') {
        res.end('This is the about page')
    } else if (req.url === '/contact') {
        res.end('This is the contact page')
    } else {
        /**
         * Escribe el staus de la request. 
         * Se puede ver desde el Network del Inspeccionar del navegador. Por defecto es 200.
         */
        res.writeHead(404)
        res.end('Page not found')
    }
    
})

server.listen(3000) //Puerto de escucha