/*global module,require,global*/
(function () {
	'use strict';

	var Backbone = require('backbone'),
		$        = require('jquery');

	module.exports = Backbone.View.extend({
		className: 'modal--csvkeys',
		initialize: function ( options ) {
			this.app = options.app;
			this.parent = options.parent;
			this.headers = options.modalOptions;
			this.render();
		},
		render: function () {
			this.$el.html(this.app.templates.modals.csvkeys({ Headers: this.headers }));
			return this;
		},
		close: function () {
			this.remove();
			this.parent.remove();
		}
	});

}());
