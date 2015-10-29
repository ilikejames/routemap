/**
 * [BusMapController]
 * @param {[type]} $scope          
 * @param {[type]} BusRouteService 
 * @param {[type]} _               
 */
module.exports = function BusMapController($scope, BusRouteService, _) {

	$scope.stations = [];
	
	$scope.$watch('route', function onChange(newval, oldval) {
		BusRouteService.getRoute(newval)
		.then(function(stations) {
			$scope.stations = stations;
		});
	});

};