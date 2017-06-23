/*global require,module*/
(function () {
	'use strict';

	var Backbone  = require('backbone'),
		_         = require('lodash'),
		BaseModel = require('../models/BaseModel');

	module.exports = Backbone.Collection.extend({
		model: BaseModel,
		where: function (attrs, first) {
			var matches = _.matches(attrs);
			return this[first ? 'find' : 'filter'](function (model) {
				var computed = {};
				_.each(model.attributes, function (unused, key) {
					computed[key] = model.get(key);
				});
				return matches(computed);
			});
		},
		nextPage: function(){
			if( ! this.PageInfo.IsLast ){
				this.PageInfo.Page += 1;
				return this.fetch();
			}
		},
		prevPage: function(){
			if( ! this.PageInfo.IsFirst ){
				this.PageInfo.Page -= 1;
				return this.fetch();
			}
		},
		parse: function( response ){
			if( response.meta ){
				this.PageInfo = {
					Page    : response.meta.page,
					Pages   : response.meta.pages,
					Count   : response.meta.count,
					IsFirst : response.meta.page === 1 ? true : false,
					IsLast  : response.meta.page === response.meta.pages ? true : false
				};
			}
			return response.data;
		}
	});
}());
