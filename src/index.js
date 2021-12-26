const express = require('express')
const exphxb = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const upload = require('express-fileupload')

// Initializations
const app = express()
const path = require('path')
require('./database')
require('./config/passport')
const morgan = require('morgan')

//Settings
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphxb({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(upload())

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave:true,
    saveUninitialized:true,
}))
app.use(passport.initialize())
app.use(passport.session())

//Global Variables
app.use((req, res, next) => {
    res.locals.user = req.user || null

    next()
})
//Routes
app.use(require('./routes/upload'))
app.use(require('./routes/index'))
app.use(require('./routes/users'))

//Static
app.use(express.static(path.join(__dirname, 'public')))

//Redirect 303


//Server is listening
app.listen(app.get('port'), () => {
    console.log('App listening at port ', app.get('port'))
})