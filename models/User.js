const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema ({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }
})

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    let user = this 
    bcrypt.hash(user.password, 10, (error, hash) => {
        console.log(error, hash);
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User