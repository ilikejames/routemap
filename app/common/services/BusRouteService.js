/**
 * [exports description]
 * @param  {[type]} $http [description]
 * @param  {[type]} $q    [description]
 * @return {[type]} Array of items
 */
module.exports = function($http, $q, _) {

	this.getRoute = function getRoute(bus) {
		var d = $q.defer();

		if(!bus) {
			d.resolve([]);
			return d.promise;
		}

		var url = 'https://api.tfl.gov.uk/line/%s/route/sequence/outbound';
		$http.get(url.replace('%s', bus))
		.then(function(response) {
			d.resolve(_.map(response.data.stations, function(itm) {
				return _.pick(itm, 'id', 'lat', 'lon', 'name');
			}));
		})
		.catch(function() {
			d.resolve([]);
		});

		return d.promise;
	};

};

