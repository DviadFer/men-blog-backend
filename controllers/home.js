const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const postList = await BlogPost.find({}).populate('author')
    res.render('index', {postList})
}