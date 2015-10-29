
(function(angular) {

	'use strict';

	angular.module('components.busmap', ['common.services'])

	.directive('busMap', ['d3', 'BusRouteService', 'lodash', require('./directive.js')]);

})(window.angular);

