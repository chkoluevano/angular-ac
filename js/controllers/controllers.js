'use strict';

var app = angular.module('AtencionCiudadanaApp.controllers', []);


/* Controlador para la pantalla principal */
app.controller('asuntosController',['$scope','AsuntosFactory','AsuntoFactory','$location',
    function AtencionController($scope,AsuntosFactory,AsuntoFactory,$location) {

        
        $scope.deleteAsunto = function (asuntoId,index) {
            AsuntoFactory.delete({ id: asuntoId },function(m){
                //$scope.todos = AsuntosFactory.query();
                if(m.status=="ok"){
                    $scope.todos.splice(index, 1);        
                }
            });
        };
        $scope.crearAsunto = function () {
            $location.path('/nuevo-asunto');
        };

       $scope.editAsunto = function (asuntoId) {
            $location.path('/asunto-detail/' + asuntoId);
        };

        /* Determina el color del semaforo */
        $scope.colorSemaforo=function(transcurridos,dias_peticion){
            var semaforo = (transcurridos * 100 / dias_peticion);
            /* Peticion es mayor o igual al 100% */
            //console.log(Math.abs(semaforo));

            if (Math.abs(semaforo)>100){
                return "sema-rojo";

            }
            else if (Math.abs(semaforo)>75){
                return "sema-ama";
            }
            else{
                return "sema-verde";
            }
        };  

        

        AsuntosFactory.query(function(m){
            //$scope.todos = m;
            var asuntos = [];
            m.forEach(function(m){
                if (m._peticion != null ){
                    var fecha = m.fecha ;
                    var dias  = m._peticion.dias;

                }
                asuntos.push(m);
            })
            $scope.todos = asuntos;
        });


}]);


/* Controlador para los detalles */
app.controller('asuntosControllerDetail', ['$scope', '$routeParams', 'AsuntoFactory','PeticionesFactory', '$location',
  function ($scope, $routeParams, AsuntoFactory, PeticionesFactory,$location) {
     
    $scope.updateAsunto = function () {
      AsuntoFactory.update({id: $routeParams.id},$scope.asunto, function(m){
        $location.path('/');
      });
    };

    $scope.cancel = function () {
      $location.path('/');
    };
    AsuntoFactory.show({id: $routeParams.id},function(m){
        $scope.asunto = m.asunto;
        $scope.lat = 21.121238;
        $scope.lon = -111.683039 ;
    });

    PeticionesFactory.query(function(m){
       $scope.peticiones = m;

    });

   


    $scope.map = { 
        center: { 
            latitude: 21.121238, 
            longitude: -101.683039  
        }, 
        zoom: 15,
        mexiIdKey: '1',
        dynamicMarkers : [
            {
                id: 1,
                latitude: 21.119973235994717,
                longitude: -101.68400635477155,
                showWindow: true
            }
        ],
        events: {
            click: function(mapModel, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                var lat = e.latLng.lat(),
                lon = e.latLng.lng();
                $scope.lat = lat;
                $scope.long = lon;
                $scope.map.clickedMarker = {
                    id: 0,
                    options: {
                      labelClass: "marker-labels",
                      labelAnchor:"50 0"
                    },
                    latitude: lat,
                    longitude: lon
                  };
                  $scope.$evalAsync();

            }
        }
     };
    $scope.map.dynamicMarkers = $scope.map.dynamicMarkers;

}]);



/* Controlador para nuevo asunto */
app.controller('asuntosControllerNew', ['$scope', 'AsuntosFactory', 'PeticionesFactory','$location',
  function ($scope, AsuntosFactory, PeticionesFactory,$location) {
    $scope.lat = 0;
    $scope.long = 0;
    $scope.saveAsunto = function () {
        /* Obtiene coordenadas */
        $scope.asunto["lat"] = $scope.lat;
        $scope.asunto["long"] = $scope.long;
        AsuntosFactory.create($scope.asunto,function(m){
            $location.path('/');
        });
    }

    
    $scope.cancel = function () {
      $location.path('/');
    };

    PeticionesFactory.query(function(m){
       $scope.peticiones = m;

    })



    $scope.map = { center: { latitude: 21.121238, longitude: -101.683039 }, zoom: 15,
        events: {
            click: function(mapModel, eventName, originalEventArgs) {
                //console.log("user defined event: " + eventName, mapModel, originalEventArgs);
                var e = originalEventArgs[0];
                var lat = e.latLng.lat(),
                lon = e.latLng.lng();
                $scope.lat = lat;
                $scope.long = lon;
                $scope.map.clickedMarker = {
                    id: 0,
                    options: {
                      //labelContent: 'lat: ' + lat + ' lon: ' + lon,
                      labelClass: "marker-labels",
                      labelAnchor:"50 0"
                    },
                    latitude: lat,
                    longitude: lon
                  };
                  $scope.$evalAsync();

            }
        }
     };
}]);


















