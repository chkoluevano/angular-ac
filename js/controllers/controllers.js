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
    $scope.cancel = function () {
      $location.path('/');
    };
    $scope.asunto = AsuntoFactory.show({id: $routeParams.id});
}]);

/* Controlador para nuevo asunto */
app.controller('asuntosControllerDetailNew', ['$scope', 'AsuntosFactory', '$location',
  function ($scope, AsuntosFactory, $location) {

    $scope.saveAsunto = function () {
        AsuntosFactory.create($scope.asunto,function(m){
                 $location.path('/');
        });
       
    }
  }]);


















