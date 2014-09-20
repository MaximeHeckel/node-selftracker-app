var selftracking = angular.module('selftracking',[]);

function mainController($scope, $http){

  //Get all the last activities in the front page
  $http.get('/api/lastactivity')
    .success(function(data){
      $scope.lastactivity = data;
    })
    .error(function(data){
      console.log('Error: '+ data);
    });

  $http.get('/api/lastrun')
    .success(function(data){
      $scope.lastrun = data;
      $scope.path = data.path;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
}
