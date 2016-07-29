var AtencionCiudadanaApp = angular.module('AtencionCiudadanaApp', []);
   

    AtencionCiudadanaApp.config(function ($httpProvider) {
		 $httpProvider.defaults.useXDomain = true;
  		 delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });


	AtencionCiudadanaApp.controller('AtencionController', function AtencionController($scope,$http) {
	 $http.get('http://localhost:8080/asuntos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);

        });


      $scope.crearAsunto = function() {
        $http.post('http://localhost:8080/asunto/', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; 
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    	};

    	$scope.deleteAsunto = function(id) {
    		console.log(id);
        	$http.delete('http://localhost:8080/asunto/' + id._id)
            	.success(function(data) {
                	//$scope.todos = data;
	                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    	};



});




