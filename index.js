const express = require('express') 
const fileUpload = require('express-fileupload')
// const ejs = require('ejs')

//Database connection
const mongoose = require('mongoose') //Paquete de node para conectarnos a las bases de datos MongoDB.
mongoose.set('strictQuery', false) 
mongoose.connect('mongodb://localhost/my_dayabase', {useNewUrlParser: true}) //Conexión a la base de datos. Si no detecta la db la crea automáticamente.

//App setup
const app = new express() 
app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

//Middleware
const validateMiddleWare = require('./middleware/validationMiddleware')
app.use('/posts/store', validateMiddleWare)
app.use(express.static('public'))
app.set('view engine', 'ejs') 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload()) 

// Controllers
const homeControler = require('./controllers/home')
const aboutControler = require('./controllers/about')
const contactControler = require('./controllers/contact')
const getPostControler = require('./controllers/getPost')
const newPostControler = require('./controllers/newPost')
const storePostControler = require('./controllers/storePost')
const newUserControler = require('./controllers/newUser')

//Get
app.get('/', homeControler)
app.get('/about', aboutControler)
app.get('/contact', contactControler)
app.get('/post/:id', getPostControler)
app.get('/posts/new', newPostControler)
app.get('/users/new', newUserControler)

//Post
app.post('/posts/store', storePostControler)
