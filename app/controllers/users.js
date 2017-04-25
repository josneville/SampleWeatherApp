var config = require('../../config')

var User = require('../models/user')
var FavCity = require('../models/fav_city')

var Promise = require('bluebird')

var weather_api = Promise.promisifyAll(require('openweathermap'))

module.exports = {
  get: (req, res) => {
    var user = req.user.toJSON()
    Promise.map(user.cities, fav_city => {
        return weather_api.nowAsync({
          id: fav_city.city_id,
          APPID: config.weather_key
        }).then(result => {
          fav_city.city = result
          return Promise.resolve(fav_city)
        })
      })
      .then(cities => {
        user.cities = cities
        return res.status(200).send(user)
      })
  },
  create: (req, res, next) => {
    var user = new User(req.body)
    user.save(() => res.status(200).send()).catch(next)
  },
  logout: (req, res) => {
    req.logout()
    return res.status(200).send()
  },
  cities: {
    add: (req, res, next) => {
      var user = req.user
      User.update({
        _id: user._id
      }, {
        $push: {
          cities: req.body
        }
      }).then(() => res.status(200).send())
    },
    remove: (req, res, next) => {
      var user = req.user
      User.update({
        _id: user._id
      }, {
        $pull: {
          'cities': {
            '_id': req.params.city_id
          }
        }
      }).then(() => res.status(200).send())
    }
  }
}
