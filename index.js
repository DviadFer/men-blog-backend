/**
 * Se ha instalado EJS (Embedded JavaScript) un template engine para renderzar de forma dinámica html con diferentes sciptles.
 * Asi no tendrámos que actualizar manualmente los compoentes como <nav> de manera manual y hacer la app escalable y mantenible.
 */

const express = require('express') 
// const path = require('path')
const ejs = require('ejs') // import de EJS. Todos archivos terminados en .ejs se renderizan con el paquete ejs

const app = new express() 

app.use(express.static('public'))
app.set('view engine', 'ejs') // con la indicación de app.set() le indicamos a express que use ejs como nuestro template engine. 

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

/**
 * En lugar de path para cargar el achivo de manera estática, usaremos res.render() para rendewizar views.
 * Pages pasrá a renombrarse views y la extensión html será .ejs
 */

app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index')
})

app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})

app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})

app.get('/post', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post')
})

/**
 * Layouts folder contiene los elementos comunes para todas la views y evitar así repetirlos en el código.
 * Ej. nav, header, footer etc.
 * 
 * Reemplazamos los elementos estáticos en cada view por scriptles del tipo <%- include('layout/elemento')%>
 */
