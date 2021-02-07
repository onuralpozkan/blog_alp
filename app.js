const express = require('express')
let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
const mongoose = require('mongoose')
const pug = require('pug')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
const app = express()
require('dotenv').config()

app.use(express.static('public'))
app.use(fileUpload())
app.use(flash())
app.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:true    
}))

global.loggedIn = null
global.user_name = null

app.use('*', (req,res,next) => {
      loggedIn = req.session.userId
      user_name = req.session.userName
      photoUrl = req.session.profilePhoto
      next()
})


app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const postRoutes = require('./routes/postRoutes')
const pageRoutes = require('./routes/pageRoutes')
//Routes
app.use(pageRoutes)
app.use(postRoutes)
// Not Found Page
app.use('*', (req,res) => res.render('notfound',{title:"404 - Not Found",subtitle:"",bg_img:'/assets/img/notfound-bg.jpg'}))
//Connection To DB
const url = process.env.MONGO_URL
mongoose.connect(url, {useUnifiedTopology:true,useCreateIndex:true,useNewUrlParser:true})

app.listen(port, () => console.log(`Server Started At ${port}`))
