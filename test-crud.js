const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.set('strictQuery', false) 
mongoose.connect('mongodb://localhost/my_dayabase', {useNewUrlParser: true}) 

/**
 * La función create() de mongoose (operación create en CRUD), necesita dos argumentos.
 * En el primero va la info que lleva el documento de la lacoleccion que estmaos dando de alta con create.
 * El segundo iría una función callback que se ejecuta cuando el create se ejecuta. En este caso,
 * retornamos el error (si no hay devuelve null) y el output del modelo target ('blogpost' le llamamos al argumento en el ejemplo) por consola.
 */
BlogPost.create({
    title: 'Título de prueba para una entrada de nuestro blog',
    body: 'Lorem Ipsum.'
}, (error, blogspot) => {
    console.log(error, blogspot)
})

/**
 * La función find() (read en crud) funciona igual que create() en cuanto a los argumentos. Pero el primero,
 * iría la query especifica que querramos buscar. SI se deja vacío, como en este caso, devuelve todos
 * los documentos asociados a la colleción del modelo BlogPost.
 */
BlogPost.find({}, (error, resultado) => {
    console.log(error, resultado)
})

// Aqui busca por título literal en la string
BlogPost.find({
    title:'Título de prueba para una entrada de nuestro blog'
}, (error, resultado) => {
    console.log(error, resultado)
})

// Aqui busca por título que contenga la palabra prueba. Las barras indican continuación, como % en SQL
BlogPost.find({
    title:/prueba/
}, (error, resultado) => {
    console.log(error, resultado)
})

//Otra función, en este caso para buscar por id sería la siguiente:

let id = '63dec4642dd2d0360745f35b'

BlogPost.findById(id, (error, resultado) => {
    console.log(error, resultado)
})

//Para cambiar el titulo (update en crud) de un documento despues de buscarlo por su id
BlogPost.findByIdAndUpdate(id, {
    title:'Nuevo título'
}, (error, resultado) => {
    console.log(error, resultado)
})

//Para eliminar (delete en crud) un documento por su id
BlogPost.findByIdAndDelete(id, (error, resultado) => {
    console.log(error, resultado)
})

//Más querys en https://www.mongodb.com/docs/manual/tutorial/query-documents/