const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    // El método .populate() hace referencia automáticamente al documento especificado con 'autor' en la colección.
    const postList = await BlogPost.find({}).populate('author')
    console.log(req.session);
    res.render('index', {postList})
}