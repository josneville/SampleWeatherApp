angular.module('WeatherApp.Config', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login")
    $stateProvider
      .state('authentication', {
        controller: 'AuthCtrl',
        abstract: true,
        templateUrl: '/partials/authentication/index.html'
      })
      .state('authentication.login', {
        templateUrl: '/partials/authentication/login.html',
        url: '/login'
      })
      .state('authentication.register', {
        templateUrl: '/partials/authentication/register.html',
        url: '/register'
      })
      .state('dashboard', {
        controller: 'DashCtrl',
        templateUrl: '/partials/dashboard/index.html',
        url: '/dashboard'
      })
  })
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })

  .config(function($mdIconProvider) {
    $mdIconProvider
      .defaultIconSet('/fonts/mdi.svg')
  })

  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('amber')
  })

  .config(function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
  })
