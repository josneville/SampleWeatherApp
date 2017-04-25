var config = require('../config')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var Promise = require('bluebird')

var User = require('./models/user')

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, cb) => {
    User.findOne({
      email: email
    }).then(user => {
      if (user == null) {
        throw 'User not found'
      }
      return user.comparePassword(password).then(() => cb(null, user))
    }).catch(cb)
  }))

  passport.serializeUser(function(user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
      }).then((user) => {
        if (user == null) {
          throw Error('User not found')
        }
        done(null, user)
      })
      .catch(done)
  })
}
