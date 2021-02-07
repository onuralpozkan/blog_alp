const BlogPost = require('../models/BlogPost')

exports.homePage = async (req,res) => {
    const blogposts = await BlogPost.find({}).populate('userid')
    res.render('index', {...page_headers.home_page,blogposts})
}

exports.createPage = (req,res) => { (req.session.userId) ? res.render('pages/create', {...page_headers.create_page,createPost:true}) : res.redirect('/')}
exports.registerPage = (req,res) => {res.render('pages/register', {...page_headers.register_page,errors: req.flash('validationErrors')})}
exports.loginPage = (req,res) => {res.render('pages/login', page_headers.login_page)}
exports.aboutPage = (req,res) => {res.render('pages/about', page_headers.about_page)}
exports.postPage = async (req,res) => {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid')
    res.render('pages/post', {blogpost})
}

const page_headers = {
    login_page: {
        title: "Login User",
        subtitle: "To Create Posts Need To Login",
        bg_img: '/assets/img/login-bg.jpg',
        
    },
    register_page: {
        title: "Register User",
        subtitle: "To Create New User",
        bg_img: '/assets/img/register-bg.jpg'
    },
    home_page: {
        title: "Blog For Everyone",
        subtitle: "Welcome to Alp's Blog",
        bg_img: '/assets/img/home-bg.jpg'
    },
    about_page: {
        title: "About Page",
        subtitle: "About Part of Blog",
        bg_img: '/assets/img/about-bg.jpg'
    },
    create_page: {
        title: "New Post",
        subtitle: "To Create Posts",
        bg_img: '/assets/img/post-bg.jpg'
    }
}