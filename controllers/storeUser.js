const User = require('../models/User')

module.exports = async (req, res) => {
    await User.create(req.body, (error, user) => {
        console.log(user, error)
        if (error) {
            /**
             * Object.keys(error.errors) nos devuelve los índices del objeto error. En este caso username y password.
             * Con map.() podmeos acceder al mensaje de error concreto para cada índice:
             */
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            console.log(validationErrors);

            //Podemos guardar estos mensajes de errores en nuestras cookies de sesión para mostrarlos luego:
            // req.session.validationErrors = validationErrors 
            //Pero vamos a usar connect-flash para que el guardado de errores no sea permanente en la sesión
            req.flash('validationErrors', validationErrors)

            //Para mantener los datos ingresados, también almacenamos en caché req.body, que contiene los datos ingresados en el formulario.
            req.flash('data',req.body)

            return res.redirect('/users/new')
        } 
        res.redirect('/')
    })
}