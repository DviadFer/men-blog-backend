const User = require('../models/User')

/**
 * Este middleware será el que compruebe con nuestra base de datos si el userId guardado en la cookie session
 * se encuentra entre algún id de los guardados en la colección users.
 * Esta comprobación la usaremos para permitir/impedir acceso/visionado de elemntos o paginas.
 */
module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) =>{
        if(error || !user)
            return res.redirect('/')
        next()
    })
}