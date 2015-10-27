
(function (angular) {

	'use strict';

	var router = require('../assets/vendor/angular-ui-router/release/angular-ui-router.js');
	

	var services =require('common/services'),
		components = require('components');


	angular.module('app', ['components', 'common.services', 'ui.router'])

	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
		

		$locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise("/index.htm");

		$stateProvider
		.state('home', {
			url: '/index.htm',
			templateUrl: 'areas/home.htm',
			controllerAs : 'homeCntrl',
			controller : function($scope) {
				this.busNumber = 48;
				this.station = 'Hackney Town Hall';
			}

		});

	}]);

})(window.angular);


