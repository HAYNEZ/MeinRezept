// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ngStorage'])


.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    // .state('tabs.facts', {
    //   url: "/facts",
    //   views: {
    //     'home-tab': {
    //       templateUrl: "templates/facts.html"
    //     }
    //   }
    // })
    // .state('tabs.facts2', {
    //   url: "/facts2",
    //   views: {
    //     'home-tab': {
    //       templateUrl: "templates/facts2.html"
    //     }
    //   }
    // })
    .state('tabs.add', {
      url: "/add",
      views: {
        'add-tab': {
          templateUrl: "templates/add.html",
          controller: "AddCtrl"
        }
      }
    })
    // .state('tabs.navstack', {
    //   url: "/navstack",
    //   views: {
    //     'add-tab': {
    //       templateUrl: "templates/nav-stack.html"
    //     }
    //   }
    // })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });
   $urlRouterProvider.otherwise("/tab/home");
})

.controller('HomeTabCtrl', function($scope, StorageService) {
  // console.log('HomeTabCtrl');
  $scope.recipes = StorageService.getAll();
  $scope.remove = function (recipe) {
    StorageService.remove(recipe);
  };
})

.controller('AddCtrl', function($scope, StorageService){
  $scope.add = function (recipe) {
    StorageService.add(recipe);
  };
})

.factory ('StorageService', function ($localStorage) {

  $localStorage = $localStorage.$default({
    recipes: []
  });

  var _getAll = function () {
    return $localStorage.recipes;
  };

  var _add = function (recipe) {
    $localStorage.recipes.push(recipe);
  };

  var _remove = function (recipe) {
    $localStorage.recipes.splice($localStorage.recipes.indexOf(recipe), 1);
  };

  return {
    getAll: _getAll,
    add: _add,
    remove: _remove
  };
})
