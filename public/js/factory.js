angular.module('WeatherApp.Factory', [])

  .factory('UserAPI', function($http) {
    return {
      get: function() {
        return $http({
          method: 'GET',
          url: '/api/users'
        })
      },
      create: function(form) {
        return $http({
          method: 'POST',
          url: '/api/users',
          data: form
        })
      },
      login: function(form) {
        return $http({
          method: 'POST',
          url: '/api/users/auth',
          data: form
        })
      },
      logout: function() {
        return $http({
          method: 'DELETE',
          url: '/api/users/auth'
        })
      },
      cities: {
        add: function(form) {
          return $http({
            method: 'POST',
            url: '/api/users/cities',
            data: form
          })
        },
        remove: function(city_id) {
          return $http({
            method: 'DELETE',
            url: '/api/users/cities/' + city_id
          })
        },
        update: function(form){
          return $http({
            method: 'PUT',
            url: '/api/users/cities/' + form._id,
            data: form
          })
        }
      }
    }
  })
  .factory('WeatherAPI', function($http) {
    return {
      find: function(query) {
        return $http({
          method: 'GET',
          url: '/api/weather?q=' + query
        })
      },
      get: function(city_id){
        return $http({
          method: 'GET',
          url: '/api/weather/' + city_id
        })
      }
    }
  })
