const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {

    User.findOne({username:req.body.username}, (err, user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (same) {
                    console.log('Login completed');
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