const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    console.log(req.params) //Saca por consola lo que viene despues de /post/ en la URL (params). Saldra la wildcard y su valor.
    const singlePost = await BlogPost.findById(req.params.id) //Del objeto params, seleccionamos el valor de la wildcard id (nombrada así antes)
    res.render('post', {singlePost}) // Pasamos el resultado de query como objeto para post.ejs

}