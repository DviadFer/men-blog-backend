module.exports = (req, res) => {
    var username = ""
    var password = ""

    //Datos almacenados en cache del formulario desde storeUser.js. Si no hubo error alguno estarán como indefinidos
    const data = req.flash('data')[0];

    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }

    //Mostraremos los errores guardados de sesión si realizamos la petición en storeUser, al recargar el formulario de registro, 
    //así que necesitamos pasarlos como variable a su respectiva plantilla EJS 
    res.render('register', {
        // errors: req.session.validationErrors <- antes. Ahora, usamos connect-flash para limpiar los errores de la sesion al recargar
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    }) 
}