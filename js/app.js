'use strict';

angular.module('AtencionCiudadanaApp', ['ngRoute','angularMoment','AtencionCiudadanaApp.services','AtencionCiudadanaApp.controllers'])
.config(function ($httpProvider,$routeProvider) {
	$routeProvider.when('/', {templateUrl: 'partials/asuntos-list.html', controller: 'asuntosController'});
	$routeProvider.when('/asunto-detail/:id', {templateUrl: 'partials/asunto-detail.html', controller: 'asuntosControllerDetail'});
	$routeProvider.when('/nuevo-asunto', {templateUrl: 'partials/create-asunto.html', controller: 'asuntosControllerNew'});

	/* CORS... */
  	/* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
    

});


	




