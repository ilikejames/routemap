
import BusRouteService from './BusRouteService.js';

(function(angular) {

	'use strict';

	angular.module('common.services', [])

	.service('BusRouteService', [ '$http', '$q', BusRouteService ]);

})(window.angular);

