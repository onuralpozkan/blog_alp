const BlogPost = require('../models/BlogPost')
const path = require('path')

exports.postBlog = (req,res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, '..', 'public/assets/img', image.name),async (error) => {
          await BlogPost.create({
              ...req.body,
              imgUrl: '/assets/img/' + image.name,
              userid:req.session.userId
          })
    })
    res.redirect('/')
    
}