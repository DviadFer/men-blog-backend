const path = require('path')
const BlogPost = require('../models/BlogPost')


module.exports = (req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, '../public/img', image.name), async () =>{
        await BlogPost.create({
            /**
             * Poniendo entre corchetes req.body y ... antes de el, pasamos en .create() un nuevo objeto con todo el contenido de ...req.body más todas las propiedades que añadamos.
             * En este caso le pasamos imagen y string que equivaldrá a la ruta de la imagen
             */
            ...req.body,
            author: req.session.userId,
            image: '/img/' + image.name
        }).catch(err => console.log(err))
        res.redirect('/')
    })
}