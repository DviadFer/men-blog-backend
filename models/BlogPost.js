const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const BlogPostSchema = new Schema ({
    title: String,
    message: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost