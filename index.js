const express = require('express') 
const path = require('path')

const app = express()

/**
 * app.use es una fucnión especial que incrementa la funcionalidad de la app añadiendola al middleware stack
 * express.static es un paquete dentro de Express que nos ayuda  a servir archivos estáticos.
 * En este caso, cualquier request que pida algñún asset se extraerá de la carpeta public.
 */
app.use(express.static('public'))

/**
 * Creación de la aplicación con el start del server en su interior como función callback del 2º argumento.
 */
app.listen(3000, ()=>{
    console.log('Server iniciado')
}) 

app.get('/about', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './pages/about.html'))
}) 

app.get('/contact', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './pages/contact.html')) 
}) 

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './pages/index.html')) 
}) 
