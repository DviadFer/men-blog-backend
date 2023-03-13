const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const postList = await BlogPost.find({})
    res.render('index', {postList})
}