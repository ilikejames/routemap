/**
 * BusRouteService.js
 * @param $http
 * @returns {Promise} 
 */

module.exports = function($http) {

	this.getRoute = function getRoute(bus) {
		var url = 'https://api.tfl.gov.uk/line/%s/route/sequence/outbound';
		return $http.get(url.replace('%s', bus));
	};

};

