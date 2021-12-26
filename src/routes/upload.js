const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')

const upload = require('express-fileupload')

router.get('/upload-file', (req, res) =>{
    res.render('upload/upload')
})

router.post('/upload-file', (req, res) =>{
    const file = req.files.file

    if (file){
        console.log(file)
        res.send("ok")
    }
})

module.exports = router
