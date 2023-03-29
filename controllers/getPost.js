const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    console.log(req.params)
    const singlePost = await BlogPost.findById(req.params.id).populate('author')
    res.render('post', {singlePost})

}