
import BusMapController from './controller.js';


(function() {
	
	describe('busMap/controller', function() {

		var $scope,
			$q,
			busRouteService = {
				getRoute : function() {}
			};

		beforeEach(inject(function(_$rootScope_, _$q_) {
			$scope = _$rootScope_;
			$q = _$q_;
		}));


		it('Should call service when bus route number is changed', function(done) {

			spyOn(busRouteService, 'getRoute').and.callFake(function(route) {
				var d = $q.defer();
				d.resolve([route + 1, route + 2, route + 3]);
				return d.promise;
			});

			$scope.route = 10;
			var controller = new BusMapController($scope, busRouteService);
			$scope.$digest();


			expect(busRouteService.getRoute).toHaveBeenCalledWith(10);
			expect($scope.stations).toEqual([11,12,13]);

			// change the bus route and should update....
			$scope.route=20;
			$scope.$digest();
			expect(busRouteService.getRoute).toHaveBeenCalledWith(20);
			expect($scope.stations).toEqual([21,22,23]);

			done();
			
		});
		
	});


})();
