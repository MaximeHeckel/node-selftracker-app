var selftracking = angular.module('selftracking',["leaflet-directive"])

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
