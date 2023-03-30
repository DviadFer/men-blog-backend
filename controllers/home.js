const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const postList = await BlogPost.find({}).sort({ _id: -1 }).populate('author')
    res.render('index', {
        postList,
        success: req.flash('success')
    })
}