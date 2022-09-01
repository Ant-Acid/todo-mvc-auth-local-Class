const passport = require('passport') // import passport
const validator = require('validator') // import validator
const User = require('../models/User') // import user model

exports.getLogin = (req, res) => { // get login
  if (req.user) { // if user is logged in
    return res.redirect('/todos') // redirect to todos
  }
  res.render('login', { // render login
    title: 'Login' // set title
  })
}

exports.postLogin = (req, res, next) => { // post login
  const validationErrors = [] // create validation errors array
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) // if email is not valid
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' }) // if password is empty

  if (validationErrors.length) { // if there are validation errors
    req.flash('errors', validationErrors) // flash validation errors
    return res.redirect('/login') // redirect to login
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false }) // normalize email

  passport.authenticate('local', (err, user, info) => { // authenticate user
    if (err) { return next(err) } // if error
    if (!user) { // if user does not exist
      req.flash('errors', info) // flash info
      return res.redirect('/login') // redirect to login
    }
    req.logIn(user, (err) => { // log in user
      if (err) { return next(err) } // if error
      req.flash('success', { msg: 'Success! You are logged in.' }) // flash success
      res.redirect(req.session.returnTo || '/todos') // redirect to todos
    })
  })(req, res, next) // call function
}

exports.logout = (req, res) => { // logout
  req.logout(() => { // logout user
    console.log('User has logged out.') // log user has logged out
  })
  req.session.destroy((err) => { // destroy session
    if (err) console.log('Error : Failed to destroy the session during logout.', err) // if error
    req.user = null // set user to null
    res.redirect('/') // redirect to home
  })
}

exports.getSignup = (req, res) => { // get signup
  if (req.user) { // if user is logged in
    return res.redirect('/todos') // redirect to todos
  }
  res.render('signup', { // render signup
    title: 'Create Account' // set title
  })
}

exports.postSignup = (req, res, next) => { // post signup
  const validationErrors = [] // create validation errors array
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) // if email is not valid
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' }) // if password is less than 8 characters
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' }) // if passwords do not match

  if (validationErrors.length) { // if there are validation errors
    req.flash('errors', validationErrors) // flash validation errors
    return res.redirect('../signup') // redirect to signup
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })   // normalize email

  const user = new User({ // create new user
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  User.findOne({
    $or: [ // find user
      { email: req.body.email },
      { userName: req.body.userName }
    ]
  }, (err, existingUser) => { // callback
    if (err) { return next(err) } // if error
    if (existingUser) { // if user exists
      req.flash('errors', { msg: 'Account with that email address or username already exists.' }) // flash error
      return res.redirect('../signup') // redirect to signup
    }
    user.save((err) => { // save user
      if (err) { return next(err) } // if error
      req.logIn(user, (err) => { // log in user
        if (err) { // if error
          return next(err) // return error
        }
        res.redirect('/todos') // redirect to todos
      })
    })
  })
}