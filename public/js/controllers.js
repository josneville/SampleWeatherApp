angular.module('WeatherApp.Controllers', [])
    .controller('AuthCtrl', function($scope, $state, UserAPI){
      $scope.login_form = {}
      $scope.register_form = {}
      $scope.login = function() {
        UserAPI.login($scope.login_form)
          .success(function(){
            $state.go('dashboard')
          })
          .error(function(){
            window.alert('Incorrect Email/Password!')
          })
      }
      $scope.register = function() {
        UserAPI.create($scope.register_form).success(function(){
          $state.go('authentication.login')
        })
        .error(function(){
          window.alert('Email already exists!')
        })
      }
    })

    .controller('DashCtrl', function($scope, $state, UserAPI, WeatherAPI){
      UserAPI.get().success(function(user) {
        $scope.user = user
      })
      .error(function(){
        $state.go('authentication.login')
      })

      $scope.searched = false

      $scope.desired_temperature = {
        min: 60,
        max: 90
      }
      $scope.search = function() {
        WeatherAPI.find($scope.query)
          .success(function(results){
            $scope.search_results = results
          })
          .error(function(){
            $scope.search_results = null
          })
          .finally(function() {
            $scope.searched = true
          })
      }
    })
