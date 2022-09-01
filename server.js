const express = require('express') // import express
const app = express() // create app
const mongoose = require('mongoose') // import mongoose
const passport = require('passport') // import passport
const session = require('express-session') // import express-session
const MongoStore = require('connect-mongo')(session) // import connect-mongo
const flash = require('express-flash') // import express-flash
const logger = require('morgan') // import morgan
const connectDB = require('./config/database') // import database
const mainRoutes = require('./routes/main') // import main routes
const todoRoutes = require('./routes/todos') // import todo routes

require('dotenv').config({ path: './config/.env' }) // import environment variables

// Passport config
require('./config/passport')(passport) // import passport config

connectDB() // connect to database

app.set('view engine', 'ejs') // set view engine to ejs
app.use(express.static('public')) // set static folder
app.use(express.urlencoded({ extended: true })) // parse urlencoded bodies
app.use(express.json()) // parse json bodies
app.use(logger('dev')) // use morgan logger
// Sessions
app.use( // use express-session
  session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // store session in database
  })
)

// Passport middleware
app.use(passport.initialize()) // initialize passport
app.use(passport.session()) // use passport session

app.use(flash()) // use express-flash

app.use('/', mainRoutes) // use main routes
app.use('/todos', todoRoutes) // use todo routes

app.listen(process.env.PORT, () => { // listen on port
  console.log('Server is running, you better catch it!') // log to console
})    