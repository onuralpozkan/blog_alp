module.exports = (req,res,next) => {
    const {description, title, message} = req.body
    if(description == null || title == null || message == null || req.files == null){
        console.log('Alanlar boş bırakılamaz')
        return res.redirect('/create')
    }
    next()
}