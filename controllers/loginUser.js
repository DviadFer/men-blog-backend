module.exports = (req, res) => {
    var username = ""
    var password = ""

    //Datos almacenados en cache del formulario desde storeUser.js. Si no hubo error alguno estarán como indefinidos
    const data = req.flash('loginData')[0];

    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }

    res.render('login', {
        errors: req.flash('error'),
        username: username,
        password: password
    }) 
}