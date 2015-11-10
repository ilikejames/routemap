
import angular from 'angular';
import ngwebsock from 'angular-websocket';

import BusRouteService from './BusRouteService.js';
import LiveBusArrivalsService from './LiveBusArrivalsService.js';

(function() {

	'use strict';

	angular.module('common.services', ['ngWebSocket'])

	.service('BusRouteService', [ '$http', '$q', BusRouteService])
	.service('LiveBusArrivalsService', ['$websock', LiveBusArrivalsService ]);

})();

