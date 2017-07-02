/*global module,require,global*/
(function () {
	'use strict';

	var Backbone = require('backbone'),
		$        = require('jquery');

	module.exports = Backbone.View.extend({
		className: 'modal modal--active',
		initialize: function ( options ) {
			this.app = options.app;
			this.render();
		},
		render: function () {
			this.$el.html(this.app.templates.modals.baseModal());
			return this;
		},
		close: function () {
			this.remove();
		}
	});

}());
