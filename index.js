const express = require('express') 
const ejs = require('ejs')
const fileUpload = require('express-fileupload')

const mongoose = require('mongoose') //Paquete de node para conectarnos a las bases de datos MongoDB.
mongoose.set('strictQuery', false) 
mongoose.connect('mongodb://localhost/my_dayabase', {useNewUrlParser: true}) //Conexión a la base de datos. Si no detecta la db la crea automáticamente.
const BlogPost = require('./models/BlogPost')

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

app.use(fileUpload()) // express-file upload añade la propiedad "files" al objeto req para que podemos acceder a los archivos subidos con req.files

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

app.get('/', async (req, res) => {
    const postList = await BlogPost.find({})
    /**
     * El metodo render de la respuesta permite pasar info al cliente (para manejar en la view de index) a traves del segundo argumento.
     * En este caso pasamos lo que nos devuelve la variable sobre la que hicimos un find del total de la base de datos.
     * La variable la pasamos entre {} porque queremos que se reconozca como un objeto. SI la pasamos tal cual, será un array.
     * 
     * En index.ejs se implementará un bucle for each para imprimir el contenido.
     */
    res.render('index', {postList})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

/**
 * :id es una wildcard que acepta cualquier string. Tiene que ser declarativa como las varibles para saber a que hace referencia.
 * Como anteriormente pusimos en index.ejs href="/post/<%= post.id %>", le llamamos :id
 */
app.get('/post/:id', async (req, res) => {
    console.log(req.params) //Saca por consola lo que viene despues de /post/ en la URL (params). Saldra la wildcard y su valor.
    const singlePost = await BlogPost.findById(req.params.id) //Del objeto params, seleccionamos el valor de la wildcard id (nombrada así antes)
    res.render('post', {singlePost}) // Pasamos el resultado de query como objeto para post.ejs
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

/**
 * Primera petición post. La quest recoge lo que sale del formulario de la view create.ejs. Sus datos se encuentran en el cuerpo de la petición.
 * Como respues, usaremos el metodo de Express redirect(). Con Node nativo, las redirecciones implican mucho más código.
 * 
 * Se ha modificado para poder subir las images a /public/img. 
 * el método .mv() sirve para mover el objeto imagen y guardar la info como archivo. Sintásis en https://www.npmjs.com/package/express-fileupload
 * Se ha movido el async de manera correspondiente.
 */
app.post('/posts/store', (req, res) =>{
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/img', image.name), async () =>{
        await BlogPost.create(req.body).catch(err => console.log(err))
        res.redirect('/')
    })
})

