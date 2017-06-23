/*global require*/
(function () {
	'use strict';

	var Backbone    = require('backbone'),
		$           = require('jquery'),
		_           = require('lodash'),
		MainRouter  = require('./routers/mainRouter'),
		Templates   = require('../templates/'),
		LoadCSS     = require('fg-loadcss'),
		App         = {
			eventAggregator: _.extend({}, Backbone.Events),
			navigate:        function (url) {
				Backbone.history.navigate(url.replace(Backbone.history.root, ''), {trigger: true});
			},
			templates: Templates,
			history: []
		};

	(function () {
		LoadCSS.loadCSS( "https://fonts.googleapis.com/css?family=Oswald:300,400,700|Roboto:300,400,700" );
		return new MainRouter(App);}()
	);
	Backbone.history.start({pushState:true});
}());
