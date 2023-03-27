module.exports = (req, res, next) => {
    if (req.body.title == null || req.body.message == null) {
        req.flash('error', 'Please fill in all the fields')
        req.flash('postData', req.body)
        return res.redirect('/posts/new')
    }
    next() 
}