var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

var FavCitySchema = new Schema({
  city_id: {type: String, required: true},
  desired_temperature: {
    min: {type: Number, required: true},
    max: {type: Number, required: true}
  }
})


module.exports = mongoose.model('FavCity', FavCitySchema)
