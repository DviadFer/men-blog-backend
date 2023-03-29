const express = require('express') 
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()

//Database connection
const mongoose = require('mongoose')
mongoose.set('strictQuery', false) 
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})

//App setup
const app = new express() 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Middleware
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat'
}))
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthMiddleware')
const validateMiddleWare = require('./middleware/validationMiddleware')
app.use(flash())
app.use('/posts/store', validateMiddleWare)

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
