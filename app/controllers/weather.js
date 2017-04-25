var config = require('../../config')
var Promise = require('bluebird')

var openweathermap = require('openweathermap')
openweathermap.defaults({units: 'imperial'})
var weather_api = Promise.promisifyAll(openweathermap)

module.exports = {
  find: (req, res, next) => weather_api.findAsync({q: req.query.q, APPID: config.weather_key}).then(results => res.status(200).send(results)).catch(next),
  get: (req, res, next) => weather_api.nowAsync({id: req.params.city_id, APPID: config.weather_key}).then(result => res.status(200).send(result)).catch(next)
}
