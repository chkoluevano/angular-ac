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

        $scope.colorSemaforo=function(transcurridos,dias_peticion){
            var semaforo = (transcurridos * 100 / Math.abs(dias_peticion));
            /* Peticion es mayor o igual al 100% */
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
app.controller('asuntosControllerDetail', ['$scope', '$routeParams', 'AsuntoFactory', '$location',
  function ($scope, $routeParams, AsuntoFactory, $location) {

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
        console.log($scope.asunto);
    });
}]);



/* Controlador para nuevo asunto */
app.controller('asuntosControllerNew', ['$scope', 'AsuntosFactory', '$location',
  function ($scope, AsuntosFactory, $location) {
    $scope.saveAsunto = function () {
        AsuntosFactory.create($scope.asunto,function(m){
                 $location.path('/');
        });
       
    }
  }]);


















