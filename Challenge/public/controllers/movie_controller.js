var movieApp = angular.module("movieModule", []);


movieApp.controller("movieController", function($scope, $http, $location)
{
    $scope.search = function() {
        var searchTitle = $scope.searchTitle;

		// search query parameter
		if (searchTitle == null || searchTitle == 'undefined' || searchTitle == '')
		{
			searchTitle = location.search.split('searchTitle=')[1];
		}

        var queryString = "searchTitle=" + searchTitle;
		$http.get('http://localhost:3000/movielist?'+queryString).
			success(function(data) {
				$scope.movies = data;
			});
    };

    $scope.listAll = function() {
    	$http.get('http://localhost:3000/movielist').
			success(function(data) {
				$scope.movies = data;
			});
    };

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


	var searchTitle = location.search.split('searchTitle=')[1];
	if (searchTitle != null && searchTitle != 'undefined' && searchTitle != '')
	{
		$scope.search();
	}
	else
	{
		$scope.listAll();
	}


});
