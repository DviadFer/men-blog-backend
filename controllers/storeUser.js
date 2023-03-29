const User = require('../models/User')

module.exports = async (req, res) => {
    await User.create(req.body, (error, user) => {
        console.log(user, error)
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            console.log(validationErrors);

            req.flash('validationErrors', validationErrors)
            req.flash('data',req.body)

            return res.redirect('/users/new')
        } 
        res.redirect('/')
    })
}