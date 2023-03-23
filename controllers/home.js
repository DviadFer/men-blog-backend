const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const postList = await BlogPost.find({})
    console.log(req.session);
    res.render('index', {postList})
}