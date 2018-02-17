/*global module,require,global*/
(function () {
	'use strict';

	var Backbone = require('backbone'),
		$        = require('jquery'),
        Moment   = require('moment'),
        _        = require('lodash');

	module.exports = Backbone.View.extend({
		className: 'modal--save',
		initialize: function ( options ) {
			this.app = options.app;
			this.parent = options.parent;
            this.data = options.modalOptions.data;
			this.render();
		},
        events: {
            'click .saveState'  : 'saveState',
            'click .cancelSave' : 'cancelSave'
        },
        saveState: function( e ){
            e.preventDefault();
            var val = this.$( 'input.page-name' ).val();
            if( val !== '' ){
                var id = val + '_' + Moment().format( 'MM-DD-YYYY_kkmmss' );
                localStorage.setItem( id, JSON.stringify( this.data ) );
                this.parent.close();
                Backbone.history.navigate( '/deals/' + id, { trigger: true } );
            } else {
                alert( 'Enter a name');
            }
        },
        cancelSave: function( e ){
            e.preventDefault();
            this.parent.close();
        },
		render: function () {
			this.$el.html(this.app.templates.modals.save());
			return this;
		},
		close: function () {
			this.remove();
			this.parent.remove();
		}
	});

}());
