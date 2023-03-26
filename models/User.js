const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Paquete para hashear contraseñas antes de guardarlas 
const bcrypt = require('bcrypt')
//Paquete que nos ayuda a manejar el error de usarios duplicados si se intenta registrar uno con mismos datos
var uniqueValidator = require('mongoose-unique-validator')

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

// Plugin de mongoose-unique-validator que carga el .pre() necesario para checkear entradas duplicadas en la db de User, impedirlo y guardar el error si es así
UserSchema.plugin(uniqueValidator);

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