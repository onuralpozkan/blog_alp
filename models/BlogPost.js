const mongoose = require('mongoose')
const User = require('./User')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title: String,
    description:String,
    message:String,
    createDate:{
        type: Date,
        default: new Date
    },
    imgUrl: String
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost