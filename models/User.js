const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Paquete para hashear contraseñas antes de guardarlas 
const bcrypt = require('bcrypt')

const UserSchema = new Schema ({
    username: String,
    password: String
})

/**
 * Con el metodo .pre('save', () => {}) de node podemos indicar acciones que se ejecutan antes de construir ningun documento dentro de la db.
 * En el segundo argumento irá lo que queramos modificar. .pre() funciona similar a un middleware al uso.
 * Bycript no permite el uso lamba de fucntion(next) de momento.
 */
UserSchema.pre('save', function(next) {
    let user = this //Mongoose hace que UserSchema esté disponible mediante la keyword this
    bcrypt.hash(user.password, 10, (error, hash) => {
        console.log(error, hash);
        user.password = hash
        next() //Para continuar
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User