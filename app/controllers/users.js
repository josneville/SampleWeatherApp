var User = require('../models/user')

module.exports = {
  get: (req, res) => res.status(200).send(req.user),
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
      user.cities.push(req.params.city_id)
      user.save(() => res.status(200).send()).catch(next)
    },
    remove: (req, res, next) => {
      var user = req.user
      user.cities.pull(req.params.city_id)
      user.save(() => res.status(200).send()).catch(next)
    }
  }
}
