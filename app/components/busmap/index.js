
(function(angular) {

	'use strict';

	angular.module('components.busmap', ['common.services'])

	.directive('busMap', ['d3', 'BusRouteService', '_', require('./directive.js')])

	.controller('BusMapController', ['$scope', 'BusRouteService', '_', require('./controller.js')]);

})(window.angular);

