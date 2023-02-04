const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.set('strictQuery', false) 
mongoose.connect('mongodb://localhost/my_dayabase', {useNewUrlParser: true}) 

/**
 * La función create() de mongoose (operaciones CRUD), necesita dos argumentos.
 * En el primero va la info que lleva el documento de la lacoleccion que estmaos dando de alta con create.
 * El segundo iría una función callback que se ejecuta cuando el create se ejecuta. En este caso,
 * retornamos el error (si no hay devuelve null) y el contenido del blogpost que acabamos de crear por consola.
 */
BlogPost.create({
    title: 'Título de prueba para una entrada de nuestro blog',
    body: 'Lorem Ipsum.'
}, (error, blogspot) => {
    console.log(error, blogspot)
})