import BusMapDirective from './directive.js';

(function(angular) {

	'use strict';

	angular.module('components.busmap', ['common.services'])

	.directive('busMap', ['BusRouteService', BusMapDirective]);

})(window.angular);

