
import controller from './controller.js';
import d3 from 'd3/d3.js';
import _ from 'lodash/lodash.js';


/**
 * The bus route directive
 * @example
 *  <bus-group route="48" station="Hackney Town Hall"></bus-group>
 * @param {BusRouteService} [BusRouteService]
 */
export default function BusMapDirective(BusRouteService) {

	'use strict';

	return {

		restrict : 'E',
		
		scope : {
			'route' : '@',
			'station' : '@'
		},
		
		template : function() {
			return '<div></div>';
		},

		controller :  controller,

		controllerAs : 'busCntrl',

		link : function(scope, element, attributes) {

			scope.stations = scope.stations | [];

			var svg = d3.select(element[0])
			.append('svg')
			.attr('width', '1000')
			.attr('height', '700');


			scope.$watch('stations', function(newval, oldval) {

				var lats = _.pluck(newval,'lat'),
					longs = _.pluck(newval, 'lon');

				svg.selectAll('circle').remove();

				var y = d3.scale.linear()
			    .domain([Math.max.apply(null, lats), Math.min.apply(null, lats)])
			    .range([20, 680]);


			    var x = d3.scale.linear()
			    .domain([ Math.min.apply(null, longs), Math.max.apply(null, longs)])
			    .range([20, 980]);


				var circles = svg.selectAll("circle").data(newval).enter().append("circle");

				var circleAttributes = circles
				.attr("cx", function (d) { return x(d.lon); })
				.attr("cy", function (d) { return y(d.lat); })
				.attr("r", function (d) { return 3; })
				.style("stroke", "gray")
				.style('fill', function(d) { return d.name==scope.station ? 'black' : 'white'; });

				svg.selectAll('circle').append("title").text(function(d) { return d.name; });

			});

		}
	};
}
