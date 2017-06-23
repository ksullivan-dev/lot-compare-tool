/*global require,module*/
(function () {
	'use strict';

	var Backbone = require('backbone'),
		_        = require('lodash');

	module.exports = Backbone.Model.extend({
		idAttribute: 'Id',
		get: function (attr) {
			var value = Backbone.Model.prototype.get.call(this, attr);
			return _.isFunction(value) ? value.call(this) : value;
		},
		toJSON: function () {
			var data = {},
					json = Backbone.Model.prototype.toJSON.call(this);
			_.each(json, function (unused, key) {
				data[key] = this.get(key);
			}, this);
			return data;
		},
		parse: function( response, options ){
			return this.preparse( response, options );
		},
		preparse: function( response, options ){
			return options.collection ? response : response.data;
		}
	});
}());
