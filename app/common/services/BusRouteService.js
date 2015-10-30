/**
 * [BusRouteService ]
 * @param {[type]} $http [description]
 * @param {[type]} $q    [description]
 */
export default function BusRouteService($http, $q) {

	this.getRoute = function getRoute(bus) {

		var d = $q.defer();

		if(!bus) {
			d.resolve([]);
			return d.promise;
		}

		var url = 'https://api.tfl.gov.uk/line/%s/route/sequence/outbound';

		$http.get(url.replace('%s', bus))
		.then(function(response) {

			var stations = response.data.stations.map( (x) => ({ 
					'id' : x.id, 
					'lat' : x.lat, 
					'lon' : x.lon, 
					'name' : x.name 
				}));

			d.resolve(stations);
		})
		.catch( () => d.resolve([]) );

		return d.promise;
	};

}

