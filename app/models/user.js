var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

var Promise = require('bluebird')
mongoose.Promise = Promise

var weather_api = Promise.promisifyAll(require('openweathermap'))

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
    type: [{
      city_id: {type: String, required: true},
      desired_temperature: {
        min: {type: Number, required: true},
        max: {type: Number, required: true}
      }
    }],
    default: []
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toObject: {
    transform: function (doc, ret) {
      Promise.map(ret.cities, favorite_city => {
        weather_api.nowAsync({id: favorite_city.city_id, APPID: config.weather_key}).then(result => {
          favorite_city.city = result
          return Promise.resolve(undefined)
        })
      })
      .then(() => {
        return ret
      })
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      Promise.map(ret.cities, favorite_city => {
        weather_api.nowAsync({id: favorite_city.city_id, APPID: config.weather_key}).then(result => {
          favorite_city.city = result
          return Promise.resolve(undefined)
        })
      })
      .then(() => {
        return ret
      })
    }
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
