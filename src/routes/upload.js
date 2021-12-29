const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')
const path = require('path')

const upload = require('express-fileupload')

router.get('/upload-file', (req, res) =>{
    res.render('upload/upload')
})

router.post('/upload-file', (req, res) =>{
    const file = req.files.file
    const fileName = file.name

    if (file){
        console.log(fileName);
        file.mv(path.join(__dirname, "../../uploads/" + fileName), (err) =>{
            if(err){
                res.send(err)
            }else{
                res.send("file uploaded correctly")
            }
        })
    }
})

module.exports = router
