
import angular from 'angular';

import BusMapDirective from './directive.js';

(function() {

	'use strict';

	angular.module('components.busmap', ['common.services'])

	.directive('busMap', ['BusRouteService', BusMapDirective]);

})();

