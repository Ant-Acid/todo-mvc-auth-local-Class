module.exports = { // export middleware
    ensureAuth: function (req, res, next) { // ensure user is authenticated
      if (req.isAuthenticated()) { // if user is authenticated
        return next() // return next
      } else { // if user is not authenticated
        res.redirect('/') // redirect to home page
      }
    }
  }
  