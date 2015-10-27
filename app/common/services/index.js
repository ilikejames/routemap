
(function (angular) {

	'use strict';


	var d3 = require('../../../assets/vendor/d3/d3.js'),
		lodash = require('../../../assets/vendor/lodash/lodash.js');


	angular.module('common.services', [])

	.factory('d3', function() {
		return d3;
	})
	.factory('lodash', function() {
		return lodash;
	})

	.factory('_', function() {
		return lodash;
	})

	.service('BusRouteService', [ '$http', require('./BusRouteService') ])

	.controller('HomeController', function() {
		this.busNumber=1;
	});

})(window.angular);

