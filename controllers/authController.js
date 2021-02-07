const User = require('../models/User')
const path = require('path')
const bcrypt = require('bcrypt')

exports.registerUser = (req,res) => {
    if(req.files){
        let pphoto = req.files.pphoto
        pphoto.mv(path.resolve(__dirname, '..','public/assets/img',pphoto.name), (error) => {
            User.create({...req.body,
            pphoto:'/assets/img/' + pphoto.name}, (error, user) =>{
                if(error){
                    const validationErrors = Object.keys(error.errors).map(i => error.errors[i].message)
                    req.flash('validationErrors', validationErrors)
                    return res.redirect('/auth/register')
                } 
                res.redirect('/')
            })
         })
    }else{
        User.create({...req.body,
        pphoto:'/assets/img/user.png'}, (error,user) => {
            if(error){
                const validationErrors = Object.keys(error.errors).map(i => error.errors[i].message)
                req.flash('validationErrors', validationErrors)
                return res.redirect('/auth/register')
            } 
            res.redirect('/')
        })
    }

     
}

exports.loginUser = (req,res) => {
    const {username, password} = req.body
    User.findOne({username}, (error,user) => {
        if(user){
            bcrypt.compare(password, user.password,(error, same) => {
                if(same){
                    req.session.userId = user._id
                    req.session.userName = user.username
                    req.session.profilePhoto = user.pphoto
                    res.redirect('/')
                }else{
                    console.log('Hatalı Şifre')
                    res.redirect('/auth/login')
                }
            })
        }else{
            console.log('Hatalı Kullanıcı Adı')
            res.redirect('/auth/login')
        }
    })
}

exports.logoutUser = ( req,res ) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
}