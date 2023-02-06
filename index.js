const express = require('express') 
const ejs = require('ejs')

const mongoose = require('mongoose') //Paquete de node para conectarnos a las bases de datos MongoDB.
mongoose.set('strictQuery', false) 
mongoose.connect('mongodb://localhost/my_dayabase', {useNewUrlParser: true}) //Conexión a la base de datos. Si no detecta la db la crea automáticamente.

const app = new express() 

app.use(express.static('public'))
app.set('view engine', 'ejs') 

/**
 * Permite dar formato al body de la petición.
 * .json() looks at requests where the Content-Type: application/json header is present and transforms the text-based JSON input into JS-accessible variables under req.body
 * .urlencoded({extended: true}) does the same for URL-encoded requests. the extended: true precises that the req.body object will contain values of any type instead of just strings.
 */
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

/**
 * Primera petición post. La quest recoge lo que sale del formulario de la view create.ejs. Sus datos se encuentran en el cuerpo de la petición.
 * Como respues, usaremos el metodo de Express redirect(). Con Node nativo, las redirecciones implican mucho más código.
 */
app.post('/posts/store', (req, res) =>{
    console.log(req.url)
    console.log(req.body) //Podemos incluso acceder a propiedades individuales. Ej req.body.title, req.body.message
    res.redirect('/')
})