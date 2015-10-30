/**
 * [BusMapController]
 * @param {[type]} $scope          
 * @param {[type]} BusRouteService 
 * @param {[type]} _               
 */
export default function BusMapController($scope, BusRouteService) {

	$scope.stations = [];
	
	$scope.$watch('route', function onChange(newval, oldval) {
		BusRouteService.getRoute(newval)
		.then( (s) => $scope.stations=s);
	});

}