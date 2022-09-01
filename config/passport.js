const LocalStrategy = require('passport-local').Strategy // import local strategy
const mongoose = require('mongoose') // import mongoose
const User = require('../models/User') // import user model

module.exports = function (passport) { // export passport
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => { // use local strategy
    User.findOne({ email: email.toLowerCase() }, (err, user) => { // find user
      if (err) { return done(err) } // if error
      if (!user) { // if user does not exist
        return done(null, false, { msg: `Email ${email} not found.` }) // return false
      }
      if (!user.password) { // if user does not have a password
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' }) // return false
      }
      user.comparePassword(password, (err, isMatch) => { // compare password
        if (err) { return done(err) } // if error
        if (isMatch) { // if password matches
          return done(null, user) // return user
        }
        return done(null, false, { msg: 'Invalid email or password.' }) // return false
      })
    })
  }))


  passport.serializeUser((user, done) => { // serialize user
    done(null, user.id) // return user id
  })

  passport.deserializeUser((id, done) => { // deserialize user
    User.findById(id, (err, user) => done(err, user)) // find user by id
  })
}
