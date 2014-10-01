var selftracking = angular.module('selftracking',["leaflet-directive","angularMoment","ui.odometer","angular.directives-round-progress"])

  selftracking.service('positionService', function($http){
    var lastrunpos = [];
    var avglat = 0;
    var avglng = 0;
    var avg = []
    $http.get('/api/lastrun')
      .success(function(data){
        angular.forEach(data.path, function (value) {
         lastrunpos.push({lat : value.latitude, lng : value.longitude});
        avglat += value.latitude
        avglng += value.longitude
        meanlat = avglat/data.path.length
        meanlng = avglng/data.path.length
       });
       avg.push({lat: meanlat, lng: meanlng});
     });
     return {
      getPos : function() {
        return lastrunpos;
      },
      getAvg : function(){
        return avg;
      }
     }
  });

function mainController($scope, $http){
  //Get all the last activities in the front page
  $http.get('/api/lastactivity')
    .success(function(data){
      $scope.lastactivity = data;
      $scope.steps = {
          label: $scope.lastactivity.steps + " / 10000  steps today",
          percentage: $scope.lastactivity.steps/10000
      };
      $scope.calories = {
          label: $scope.lastactivity.calories + " / 2184  calories today",
          percentage: $scope.lastactivity.calories/2184
        };
      $scope.dist = {
          label: $scope.lastactivity.distance + " / 8.00 km today",
          percentage: $scope.lastactivity.distance/8
        };
    })
    .error(function(data){
      console.log('Error: '+ data);
    });
  $http.get('/api/lastrun')
    .success(function(data){
      $scope.lastrun = data;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
}

function mapController($scope, positionService){
  angular.extend($scope, {
              defaults: {
                tileLayer : 'http://{s}.tiles.mapbox.com/v3/maximeheckel.jimj6jon/{z}/{x}/{y}.png',
                scrollWheelZoom: false,
                zoomControl : false,
                doubleClickZoom : false,
                dragging : false,
                keyboard : false,
                attributionControl : false
              },
              run: {
                  lat : 48.585,
                  lng : 7.75,
                  zoom: 13
              },
              path: {
                  p1: {
                      color: '#8AAEFF',
                      weight: 3,
                      zoom : 8,
                      latlngs: positionService.getPos()
                  }
                }
          });
}

function detailController($scope, $http, summaryService){
  summaryService.getSum(function(total){
    $scope.total = total;
  });
  $http.get('/api/activities')
    .success(function(data){
      $scope.activities = data;
      var sumStep = 0;
      var sumKm = 0;
      var sumCal = 0;
      for( i = 0; i < data.length; i++){
        sumStep += data[i].steps;
        sumKm += data[i].distance;
        sumCal += data[i].calories;
        $scope.totalStep = sumStep;
        $scope.totalKm = sumKm;
        $scope.totalCal = sumCal;
      }
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
}
