const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    User.findOne({username:req.body.username}, (err, user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user._id
                    return res.redirect('/')
                } else {
                    req.flash('error', "Password don't match!")
                    req.flash('postData', req.body)
                    return res.redirect('/users/login')
                }
            })
        } else {
            req.flash('error', "User doesn't exist!")
            req.flash('postData', req.body)
            return res.redirect('/users/login')
        }
    })
}