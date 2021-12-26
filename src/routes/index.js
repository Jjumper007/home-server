const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')

router.get('/', isAuthenticated, (req, res) => {
    res.render('index', { userName: req.user.name })
})
module.exports = router