module.exports = (req, res) => {
    //Mostraremos los errores guardados de sesión si realizamos la petición en storeUser, al recargar el formulario de registro, 
    //así que necesitamos pasarlos como variable a su respectiva plantilla EJS 
    res.render('register', {
        errors: req.session.validationErrors
    }) 
}