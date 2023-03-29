module.exports = (req, res) => {
    if (req.session.userId) {
        var title 
        var author 
        var message
        const data = req.flash('postData')[0]
    
        if(typeof data != "undefined"){
            title = data.title
            author = data.author
            message = data.message
        }
        return res.render('create', {
            errors: req.flash('error'),
            title: title,
            message: message,
            author: author,
            createPost: true 
        })
    }
    res.redirect('/users/login')
}