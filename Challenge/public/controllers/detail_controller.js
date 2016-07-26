var detailApp = angular.module("detailModule", ['metawidget']);

detailApp.controller("detailController", function($scope, $http, $location)
{
    $scope.getMovieById = function() {
		var titleId = location.search.split('titleId=')[1];
    	$http.get('http://localhost:3000/movielist/'+titleId).
			success(function(data) {
				console.log('data = ' + data);
				if (data != null)
				{
					$scope.movie = data[0];
				}
			});
    };

});
