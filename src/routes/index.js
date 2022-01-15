const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')
const dirTree = require('directory-tree')
const path = require('path')

router.get('/', isAuthenticated, (req, res) => {
    const tree = dirTree(path.join(__dirname, '../public/uploads/'))
    const images = tree.children
    res.render('index', { userName: req.user.name, images: images })
})
module.exports = router