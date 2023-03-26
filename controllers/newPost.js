module.exports = (req, res) => {
    if (req.session.userId) {
        var title 
        var author 
        var message
        //Datos almacenados en cache del formulario desde storeUser.js. Si no hubo error alguno estarán como indefinidos
        const data = req.flash('postData')[0];
    
        if(typeof data != "undefined"){
            title = data.title
            author = data.author
            message = data.message
        }
        return res.render('create', {
            errors: req.flash('error'),
            title: title,
            message: message,
            author: author
        })
    }
    res.redirect('/users/login')
}