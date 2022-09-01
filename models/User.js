const bcrypt = require('bcrypt') // import bcrypt
const mongoose = require('mongoose') // import mongoose

const UserSchema = new mongoose.Schema({ // create user schema
  userName: { type: String, unique: true }, 
  email: { type: String, unique: true },  
  password: String 
})


// Password hash middleware.
 
 UserSchema.pre('save', function save(next) { // before saving user
  const user = this // set user to this
  if (!user.isModified('password')) { return next() } // if password is not modified, return next
  bcrypt.genSalt(10, (err, salt) => { // generate salt
    if (err) { return next(err) } // if error, return next
    bcrypt.hash(user.password, salt, (err, hash) => { // hash password
      if (err) { return next(err) } // if error, return next
      user.password = hash // set password to hash
      next() // return next
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) { // compare password
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { // compare password
    cb(err, isMatch) // return error and isMatch
  })
}


module.exports = mongoose.model('User', UserSchema) // export user model
