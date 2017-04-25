angular.module('WeatherApp.Controllers', [])
  .controller('AuthCtrl', function($scope, $state, UserAPI) {
    $scope.login_form = {}
    $scope.register_form = {}
    $scope.login = function() {
      UserAPI.login($scope.login_form)
        .success(function() {
          $state.go('dashboard')
        })
        .error(function() {
          window.alert('Incorrect Email/Password!')
        })
    }
    $scope.register = function() {
      UserAPI.create($scope.register_form).success(function() {
          $state.go('authentication.login')
        })
        .error(function() {
          window.alert('Email already exists!')
        })
    }
  })

  .controller('DashCtrl', function($scope, $state, UserAPI, WeatherAPI) {
    $scope.getUser = function() {
      UserAPI.get().success(function(user) {
          $scope.user = user
          for (var i = 0; i < $scope.user.cities.length; i++){
            if ($scope.user.cities[i].city.main.temp > $scope.user.cities[i].desired_temperature.min && $scope.user.cities[i].city.main.temp < $scope.user.cities[i].desired_temperature.max){

              $scope.user.cities[i].within_range = true
            }
            else {
              $scope.user.cities[i].within_range = false
            }
          }
          $scope.generateGraph()
        })
        .error(function() {
          $state.go('authentication.login')
        })
    }
    $scope.getUser()


    $scope.searched = false

    $scope.desired_temperature = {
      min: 60,
      max: 90
    }
    $scope.search = function() {
      WeatherAPI.find($scope.query)
        .success(function(results) {
          $scope.search_results = results
          $scope.searched = true
        })
        .error(function() {
          $scope.search_results = null
          $scope.searched = true
        })
    }

    $scope.add_city = function(city_id) {
      UserAPI.cities.add({
          city_id: city_id,
          desired_temperature: $scope.desired_temperature
        })
        .success(function() {
          $scope.getUser()
        })
    }

    $scope.remove_city = function(city_id){
      UserAPI.cities.remove(city_id).success(function(){
        $scope.getUser()
      })
    }

    $scope.resetGraph = function() {
      $scope.labels = []
      $scope.series = ["Temperature", "Desired Min Temperature", "Desired Max Temperature"]
      $scope.data = [[], [], []]
      $scope.options = {
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }]
        }
      }
      $scope.datasetOverride = [{
          label: "Temperature",
          borderWidth: 1,
          type: 'line',
          fill: false,
          lineTension: 0
        },
        {
          label: "Desired Min Temperature",
          borderWidth: 3,
          fill: false,
          steppedLine: true,
          lineTension: 0,
          hoverBorderColor: "rgba(255,99,132,1)",
          type: 'bar'
        },
        {
          label: "Desired Max Temperature",
          borderWidth: 3,
          fill: false,
          steppedLine: true,
          lineTension: 0,
          hoverBorderColor: "rgba(0,99,132,1)",
          type: 'bar'
        }
      ];
    }
    $scope.resetGraph()

    $scope.generateGraph = function() {
      $scope.resetGraph()
      for (var i = 0; i < $scope.user.cities.length; i++) {
        $scope.labels.push($scope.user.cities[i].city.name)
        $scope.data[0].push($scope.user.cities[i].city.main.temp)
        $scope.data[1].push($scope.user.cities[i].desired_temperature.min)
        $scope.data[2].push($scope.user.cities[i].desired_temperature.max)
      }
    }

  })
