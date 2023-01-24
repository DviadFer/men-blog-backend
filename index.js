const express = require('express') 
const path = require('path')

const app = express()

/**
 * Creación del
 */

app.listen(3000, ()=>{
    console.log('Aplicación creada a traves de Express con puerto 3000')
}) 


// Con Express podemos modificar el tipo de respuesta a las requests del navegador. En este caso estamos devolviendo un json al GET en /about
app.get('/about', (req, res) =>{
    res.json({
        name: 'Diego Viador'
    })
})

/**
 * En el caso de que queramos hacer routing de más endpoints, el if-else antiguo de la rama testing,
 * quedará refactorizado con Express en pequeñas funciones, encargadas cada una de manejar cada endpoint
 */

 //Paquete de node que nos ayuda a conseguir la ruta específica de un archivo, ya que res necesita siempre el absolute path.

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './html/index.html')) //Dentro del método sendFIle() se encuentra la ruta absoluta que gracias a path podemos obtener, con indiferencia del sistema de directorios de nuestro OS
})

//Como curiosidad el método sendFile() con vainilla Node equivaldría a escribir 40+ líneas de código.
