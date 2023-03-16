const User = require('../models/User')

module.exports = async (req, res) => {
    await User.create(req.body, (error, user) => {
        console.log(user, error)
        if (error) {
            return res.redirect('/users/new')
        } 
        res.redirect('/')
    })
}