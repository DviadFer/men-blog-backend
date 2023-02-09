const mongoose = require('mongoose')
const Schema = mongoose.Schema 

/**
 * Creación del primer model. Un model representa una colección dentro de la base de datos MongoDb.
 * Una collección equivaldria a un elemnto como usuarios, entradas de blog, productos etc.
 * Se definene a través de la interfaz Schema. Cada documento (entradas de una colección en MongoDB) dentro de nuestra db, 
 * tendrá la estructura especificada en su Schema.
 */
const BlogPostSchema = new Schema ({
    title: String,
    message: String
})

/**
 * Creación del modelo. Se le pasa como primer argumento el nombre (ensingular, luego en la db aparecerá en plural) que queramos y como segundo el Schema definido para sus documentos.
 */
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost