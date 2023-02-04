/**
 * Se ha instalado nodemon en Node para que automaticamente haga restart del server capa vez que se detecten cambios en index.js (server-side file).
 * --save option: Añade el paquete a nuestro package.json para que se pueda instalar en un futuro en otra maquina como dependencia.
 * -dev option: No instalará nodemon en la versión de la app para producción.
 * Después de su instalación, para usar su funcionalidad, basta con añadir el script 'start' customizado en package.json
 * A partir de ahora usamos npm start en lugar de node index.js
 */

const express = require('express') //Import de express en Node

const app = new express() // Hacemos uso de la función express para la creación de una nueva app
const path = require('path')

app.use(express.static('public')) //express cargará los recursos estáticos desde la carpeta 'public'

//Funcion especial de express para iniciar, inicia el server en el puerto 4000 y carga callback de req/res en segundo argumento.
app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

/**
 * Ahora se llama a los arcivos con peticiones get desde el server e lugar de renders estáticos.
 * Ej. en lugar de cargar contanto.html con localhost:4000/contacto.html se hará localhost:4000/contacto
 */

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})