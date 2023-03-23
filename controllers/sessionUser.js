const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {

    //Con .findOne comparamos en la base de datos si hay al menos un username que coincida con el del body de la petición.
    //Recordamos que en la funcion del 2º argumento van err y respuesta siempre en ese orden. Aunque no se use err, hay que ponerlo
    User.findOne({username:req.body.username}, (err, user) => {
        if(user) {
            //Con el paquete bcrypt descomprimimos has y comparamos con campo introducido en el fromulario
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (same) {
                    console.log('Login completed');
                    //Guarda en el id de usuario (en mongo db se expresa como _id) en como campo userId de la cookie 'session' al realizar la petición.
                    //En esta cookie, userId será compartido entre el navegador y el servidor hasta que sea reiniciada/eliminada.
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    console.log("Password don't match!")
                }
            })
        } else {
            console.log("User doesn't exist!");
            res.redirect('/users/login')
        }
    })

}