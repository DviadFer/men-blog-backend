module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.message == null) {
        console.log('There is some empty fields')
        return res.redirect('/posts/new')
    }
    next() 
}