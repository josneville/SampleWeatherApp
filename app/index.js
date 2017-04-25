var path = require('path')

var controllers = require('./controllers')
var middleware = require('./middleware')

module.exports = function(app, passport){
  require('./passport')(passport)

  app.get('/api/users', middleware.auth.isLoggedIn, controllers.users.get)
  app.post('/api/users', controllers.users.create)
  app.post('/api/users/auth', passport.authenticate('local'), (req, res) => res.status(200).send())
  app.delete('/api/users/auth', middleware.auth.isLoggedIn, controllers.users.logout)

  app.post('/api/users/cities', middleware.auth.isLoggedIn, controllers.users.cities.add)
  app.put('/api/users/cities/:city_id', middleware.auth.isLoggedIn, controllers.users.cities.update)
  app.delete('/api/users/cities/:city_id', middleware.auth.isLoggedIn, controllers.users.cities.remove)

  app.get('/api/weather', middleware.auth.isLoggedIn, controllers.weather.find)
  app.get('/api/weather/:city_id', middleware.auth.isLoggedIn, controllers.weather.get)

  // Default to AngularJS when GET route not found
  app.get('*', function(req, res) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'))
  })
}
