const User = require('../models/User')

module.exports = async (req, res) => {
    await User.create(req.body, (error, user) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

            req.flash('validationErrors', validationErrors)
            req.flash('data',req.body)

            return res.redirect('/users/new')
        } else {
            req.flash('success', `You have successfully <strong>registered as ${user.username}</strong>`)
        }
        res.redirect('/')
    })
}