const express = require('express') 
const fileUpload = require('express-fileupload')
//Package to store user session in browser cookies
const expressSession = require('express-session')
/**
 * Al guardar los mensajes de error en una sesión, estos permanecen allí incluso después de que el usuario envíe el formulario correctamente 
 * y lo vuelva a visitar más tarde, lo que puede ser problemático. Aquí es donde entra en juego el flushing de los datos de errores después 
 * del ciclo de vida de la solicitud actual para que no estén disponibles en la próxima solicitud. Connect-flash es un paquete que se puede 
 * utilizar para crear un área especial en la sesión para almacenar y borrar mensajes después de que se muestren al usuario, lo que lo 
 * convierte en una herramienta útil para implementar flushing.
 */
const flash = require('connect-flash');

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
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
//la string asociada a secret será usada por el paquete express-session para firmar y encriptar el ID de sesión que es compartido en el navegador.
//en dev tools del browser 'keyboard cat' saldrá hasheada.
app.use(expressSession({secret: 'keyboard cat'}))
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthMiddleware')
//Middleware del paquete connect-flash
app.use(flash())
const validateMiddleWare = require('./middleware/validationMiddleware')
app.use('/posts/store', validateMiddleWare)

/**
 * Variable global para todas las plantillas EJS y función para guardar el token de sesión userId. 
 * Así podremos acceder desde cualquier parte del código a esta variable y montrar bloques concretos o no en función de esta.
 * La wildcard '*' hace que la función se palique a todas las peticiones del servidor.
 */
global.loggedIn = null

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

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
const logoutUserController = require('./controllers/logoutUser')

//Get
app.get('/', homeControler)
app.get('/about', aboutControler)
app.get('/contact', contactControler)
app.get('/post/:id', getPostControler)
app.get('/posts/new', authMiddleware, newPostControler)
app.get('/users/new', redirectIfAuthMiddleware, newUserControler)
app.get('/users/login', redirectIfAuthMiddleware, loginUserControler)
app.get('/users/logout', logoutUserController)
app.get('*', (req, res) => res.render('notfound'))

//Post
app.post('/posts/store', authMiddleware, storePostControler)
app.post('/users/store', redirectIfAuthMiddleware, storeUserControler)
app.post('/users/session', redirectIfAuthMiddleware, sessionUserControler)
