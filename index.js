const express = require('express') 
const fileUpload = require('express-fileupload')
//Package to store user session in browser cookies
const expressSession = require('express-session')

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
//la string asociada a secret será usada por el paquete express-session para firmar y encriptar el ID de sesión que es compartido en el navegador.
//en dev tools del browser 'keyboard cat' saldrá hasheada.
app.use(expressSession({secret: 'keyboard cat'}))
const authMiddleware = require('./middleware/authMiddleware')

// Controllers
const homeControler = require('./controllers/home')
const aboutControler = require('./controllers/about')
const contactControler = require('./controllers/contact')
const getPostControler = require('./controllers/getPost')
const newPostControler = require('./controllers/newPost')
const storePostControler = require('./controllers/storePost')
const newUserControler = require('./controllers/newUser')
const storeUserControler = require('./controllers/storeUser')
const loginUserControler = require('./controllers/loginUser')
const sessionUserControler = require('./controllers/sessionUser')

//Get
app.get('/', homeControler)
app.get('/about', aboutControler)
app.get('/contact', contactControler)
app.get('/post/:id', getPostControler)
app.get('/posts/new', authMiddleware, newPostControler)
app.get('/users/new', newUserControler)
app.get('/users/login', loginUserControler)

//Post
app.post('/posts/store', authMiddleware, storePostControler)
app.post('/users/store', storeUserControler)
app.post('/users/session', sessionUserControler)
