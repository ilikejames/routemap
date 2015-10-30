
import angular from 'angular';

import BusRouteService from './BusRouteService.js';

(function() {

	'use strict';

	angular.module('common.services', [])

	.service('BusRouteService', [ '$http', '$q', BusRouteService ]);

})();

