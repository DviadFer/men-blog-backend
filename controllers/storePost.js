const path = require('path')
const BlogPost = require('../models/BlogPost')

module.exports = (req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, '../public/img', image.name), async () =>{
        await BlogPost.create({
            ...req.body,
            author: req.session.userId,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
}