/**
 * Project depends on ngRoute and firebase modules
 */
// The app name
angular.module('project', ['ngRoute', 'firebase', 'ui.bootstrap'] ) 
// Define a singleton called fbURL
.value('fbURL', 'https://glowing-torch-2707.firebaseio.com/')
//Defining another singleton called Projects - array of values from fb
.factory('FirebaseStorage', function(fbURL) {
	return new Firebase(fbURL)
})
.factory('Subjects', function($firebase, FirebaseStorage) {
  return $firebase(FirebaseStorage.child("subjects")).$asArray();
})

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/edit/:projectId', {
      controller:'EditCtrl',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
.controller('ListCtrl', function($scope, Subjects) {
  $scope.classes = Classes;
})
 
.controller('EditCtrl',
  function($scope, $location, $routeParams, Projects) {
    var projectId = $routeParams.projectId,
        projectIndex;
 
    $scope.projects = Projects;
    projectIndex = $scope.projects.$indexFor(projectId);
    $scope.project = $scope.projects[projectIndex];
 
    $scope.destroy = function() {
        $scope.projects.$remove($scope.project).then(function(data) {
            $location.path('/');
        });
    };
 
    $scope.save = function() {
        $scope.projects.$save($scope.project).then(function(data) {
           $location.path('/');
        });
    };
})

.controller('ProfileCtrl', function() {
   this.title="My Title";
})

.controller('AuthorCtrl', function($scope, Subjects) {
	$scope.subjects = Subjects;
	$scope.save = function() {
	      //Subjects.$add($scope.subject);
		Subjects.$add(this.subject);
	  };
	  $scope.destroy= function() {
	    Subjects.$remove(this.subject);
	  };
})
.controller('TabsDemoCtrl', 
		function ($scope) {
			console.log("tst");
		  $scope.tabs = [
		    { title:'Dynamic Title 1', content:'Dynamic content 1 ' },
		    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
		  ];

		  $scope.alertMe = function() {
		    setTimeout(function() {
		      alert('You\'ve selected the alert tab!');
		    });
		  };
		  
});
