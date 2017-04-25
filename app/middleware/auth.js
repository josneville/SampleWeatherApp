module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    var e = new Error('Not Authenticated')
    e.status = 401
    return next(e)
  }
}
