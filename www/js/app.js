// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  /*.state('tabs.home', {
    url: '/home',
    views: {
      'home-tab' : {
        templateUrl: 'templates/home.html'
      }
    }
  })*/
  .state('tabs.task', {
    url: '/task',
    views: {
      'task-tab' : {
        templateUrl: 'templates/tasks.html',
        controller: 'taskCtrl'
      }
    }
  })
  .state('tabs.calendar', {
    url: '/calendar',
    views: {
      'calendar-tab' : {
        templateUrl: 'templates/calendar.html',
      }
    }
  })
  $urlRouterProvider.otherwise('/tab/task');
})


.controller('taskCtrl', function($scope, $ionicPopup) {

        var day;
      switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case  6:
        day = "Saturday";
        break;
}
  $scope.currentDay = day;

          var month;
                  var day;
        $scope.tasks = []
        $scope.data = {
          showDelete: false
        }
  $scope.addTask = function() {

     // An elaborate, custom popup
     var myPopup = $ionicPopup.show({
       template: '<input type="text-area" ng-model="tasks.info">',
       title: 'Enter Task',
       subTitle: 'Enter a Task for today: ',
       scope: $scope,
       buttons: [
         { text: 'Cancel' },
         {
           text: '<b>Confirm</b>',
           type: 'button-positive',
           onTap: function(e) {
             if (!$scope.tasks.info) {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
             } else {
                  $scope.tasks.push($scope.tasks.info) // adds the task
                   myPopup.close();
             }
           }
         }
       ]
   })
 }
 $scope.swapTask = function(task, fromIndex, toIndex) {
    $scope.tasks.splice(fromIndex,1);
    $scope.tasks.splice(toIndex, 0, task);
 };

});
