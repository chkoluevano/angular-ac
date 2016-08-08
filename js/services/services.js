
'use strict';

var services = angular.module('AtencionCiudadanaApp.services', ['ngResource']);
var baseUrl = 'http://localhost\\:8080';

/* Asuntos */
services.factory('AsuntosFactory', function ($resource) {
    return $resource(baseUrl + '/asuntos', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('AsuntoFactory', function ($resource) {
    return $resource(baseUrl + '/asunto/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', isArray: false, params: {id: '@id'} }
    })
});

/* Peticiones */
services.factory('PeticionesFactory', function ($resource) {
    return $resource(baseUrl + '/peticiones', {}, {
        query: { method: 'GET', isArray: true }
	})
});


