/**
 * [BusMapController]
 * @param {[type]} $scope          
 * @param {[type]} BusRouteService 
 * @param {[type]} _               
 */
function BusMapController($scope, BusRouteService, _) {

	$scope.stations = [];
	
	$scope.$watch('route', function onChange(newval, oldval) {
		
		BusRouteService.getRoute(newval)
		.then(function(response) {
			$scope.stations = _.map(response.data.stations, function(itm) {
				return _.pick(itm, 'id', 'lat', 'lon', 'name');
			});
		});

	});

}


module.exports = BusMapController;
