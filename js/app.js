'use strict';

angular.module('AtencionCiudadanaApp', ['uiGmapgoogle-maps','ngRoute','angularMoment','angucomplete','AtencionCiudadanaApp.services','AtencionCiudadanaApp.controllers'])
.config(function ($httpProvider,$routeProvider,uiGmapGoogleMapApiProvider) {
	$routeProvider.when('/', {templateUrl: 'partials/asuntos-list.html', controller: 'asuntosController'});
	$routeProvider.when('/asunto-detail/:id', {templateUrl: 'partials/asunto-detail.html', controller: 'asuntosControllerDetail'});
	$routeProvider.when('/nuevo-asunto', {templateUrl: 'partials/create-asunto.html', controller: 'asuntosControllerNew'});

	/* CORS... */
  	/* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCpj_95R86QIHdKA4elJmg4UXAofeoPqYE',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    

});


	




