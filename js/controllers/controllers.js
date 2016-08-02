'use strict';

var app = angular.module('AtencionCiudadanaApp.controllers', []);


/* Controlador para la pantalla principal */
app.controller('asuntosController',['$scope','AsuntosFactory','AsuntoFactory','$location', 
    function AtencionController($scope,AsuntosFactory,AsuntoFactory,$location) {
        
        $scope.deleteAsunto = function (asuntoId) {
            AsuntoFactory.delete({ id: asuntoId },function(m){
                $scope.todos = AsuntosFactory.query();
            });

        };

        $scope.crearAsunto = function () {
            $location.path('/nuevo-asunto');
        };

       $scope.editAsunto = function (asuntoId) {
            $location.path('/asunto-detail/' + asuntoId);
        };

        $scope.todos = AsuntosFactory.query();

}]);


/* Controlador para los detalles */
app.controller('asuntosControllerDetail', ['$scope', '$routeParams', 'AsuntoFactory', '$location',
  function ($scope, $routeParams, AsuntoFactory, $location) {

    $scope.updateAsunto = function () {
      AsuntoFactory.update({id: $routeParams.id},$scope.asunto, function(m){
        $location.path('/');
        //console.log(m);
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


















