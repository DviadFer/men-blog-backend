const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Paquete para hashear contraseñas antes de guardarlas 
const bcrypt = require('bcrypt')

/**
 * Mongoose también nos ayuda a validar datos, no solo a definir su tipo en el schema.
 * en caso de username y password, pasará un objecto config que especifica reglas de validación.
 * Estás reglas se tendran que cumplir
 */
const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

/**
 * Con el metodo .pre('save', () => {}) de node podemos indicar acciones y reglas adicionales que se ejecutan antes de construir un documento en la db.
 * En el segundo argumento irá lo que queramos modificar. .pre() funciona similar a un middleware al uso.
 * No permite el uso de abreviación de funciones lamba, así que tiene que especificarse fucntion(next) de momento.
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