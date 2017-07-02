/*global require,module,ga,dataLayer,document,window*/
(function () {
	'use strict';

	var Backbone        = require('backbone'),
		$               = require('jquery'),
		_               = require('lodash'),
		Deals           = require('../views/deals'),
		Modal           = require('../views/_modals/baseModal'),
		Modals          = {
			CSVKeys    : require('../views/_modals/csvkeys'),
		};

		require( '../plugins/whiteout.js');

	module.exports = Backbone.Router.extend({
		routes: {
			/* main routes */
			''      : 'deals',
			'deals' : 'deals',
		},
		deals: function(){
			this.loadView( new Deals({ app: this.app }) );
		},
		initialize: function(App) {
			this.app = App;
			this.bind('route', this._pageView);
			this.on('route', function (route, params) {
				this.app.history.push( Backbone.history.fragment );
				this.app.eventAggregator.trigger('routeChanged', route, params);
				$( 'body' )[ route === 'home' ? 'addClass' : 'removeClass' ]( 'home' );
				$( 'html, body' ).animate({ scrollTop: 0 }, 0 );
			});

			var self = this;

			// Navigate all links that are not external or action links within the app
			$( document ).on( 'click', 'a:not( .action )', function( e ){
				if( e.currentTarget.hostname === window.location.hostname ){
					self.globalLinkHandler( e );
				} else {
					$( e.currentTarget ).attr( 'target', '_blank' );
				}
			});
			// Prevent default on disabled buttons
			$( document ).on( 'click', '.btn--disabled', function( e ){ e.preventDefault(); } );
			// Run labelize on all specified input
			$( document ).on( 'keyup', '.input--labelize', this.labelize );

			this.listenTo( this.app.eventAggregator, 'launchModal', this.launchModal );
		},
		labelize: function( e ){
			var input = $( e.currentTarget );
			input.siblings( 'label' )[ input.val() !== '' ? 'addClass' : 'removeClass' ]( 'labelize' );
		},
		globalLinkHandler: function( e ){
			if ( e.metaKey || e.ctrlKey ) {
			    return;
			}
			e.preventDefault();
			Backbone.history.navigate($(e.currentTarget).attr('href'), { trigger: true });
		},
		launchModal: function( modalName, options ){
			this.modal = new Modal({ app: this.app });
			this.modalContent = new Modals[modalName]({ app: this.app, parent: this.modal, modalOptions: options });
			$( '#modals' ).html( this.modal.el );
			this.modal.$( '.modal__content' ).html( this.modalContent.el );
		},
		loadView: function ( view ) {
			if (this.view) {
				if (this.view.close) {
					this.view.close();
				} else {
					this.view.remove();
				}
			}
			this.view = view;

			$( '#content' ).html( this.view.$el );
		}
	});
}());
