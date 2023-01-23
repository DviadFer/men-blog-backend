const http = require('http') //Require, similar a import o include, para incluir paquetes de node. Se pasa el nombre del paquete como una string
/**
 * Función callback. Espera una request y enviará la repsuesta sólo cuando la reciba.
 * En este caso sacará por consola la url de la request e imprimira texto en la web como repsuesta.
 */
const server = http.createServer((req, res) => {
    console.log(req.url)
    res.end('Hello Node.js')
})

server.listen(3000) //Puerto de escucha