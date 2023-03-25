/**
 * Este middleware será el que redirija a la home si detecta cookies de sesión.
 * Util para impedir acceso a login o registro.
 */
module.exports = (req, res, next) => {
    if(req.session.userId) {
        return res.redirect('/')
    }
    next()
}