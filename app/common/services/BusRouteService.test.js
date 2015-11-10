
import BusRouteService from './BusRouteService.js';


(function() {
	
	describe('BusRouteService', function() {

		var $rootScope,
			$httpBackend,
			busRouteService;

		beforeEach(inject(function(_$rootScope_, _$http_, _$httpBackend_, _$q_) {
			$rootScope = _$rootScope_;
			$httpBackend = _$httpBackend_;
			busRouteService = new BusRouteService(_$http_, _$q_);
		}));

		//afterEach(function() {
		//	$httpBackend.verifyNoOutstandingExpectation();
		//	$httpBackend.verifyNoOutstandingRequest();
		//});


		it('Should return empty array when no bus route passed', function(done) {

			busRouteService.getRoute()
			.then(function onSuccess(data) {
				expect(data).toEqual([]);
				done();
			});

			$rootScope.$apply();

		});


		it('Should return an array of stations and their coordinates', function(done) {

			var station1 = {
				id : 1,
				name : 'name',
				lat : 1,
				lon : 0.5
			};

			var station2 = {
				id : 2,
				name : 'name2',
				lat : 1.2,
				lon : -0.5
			};

			$httpBackend.expectGET('https://api.tfl.gov.uk/line/48/route/sequence/outbound')
			.respond({
				something : 'something',
				stations : [station1, station2]
			});


			busRouteService.getRoute(48)
			.then(function(data) { 
				expect(data).toEqual([ station1, station2 ]);
				done();
			});

			$httpBackend.flush();
		});


	});


})();
