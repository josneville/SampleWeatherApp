var config = require('../../config')

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var Promise = require('bluebird')
mongoose.Promise = Promise

var FavCity = require('./fav_city')

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cities: {
    type: [FavCity.schema]
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

UserSchema.pre('save', function(next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash
        next()
      })
      .catch(next)
  }
})

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => {
      if (!isMatch) {
        throw 'Not Authenticated'
      }
      return Promise.resolve(undefined)
    })
}

module.exports = mongoose.model('User', UserSchema)
