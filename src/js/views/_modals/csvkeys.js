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
            this.count = 1;
            this.fields = {
                1: 'name',
                2: 'number',
                3: 'estimate',
                4: 'price',
                5: 'shipping'
            };
			this.render();
		},
        events: {
            'click .columnMatcher': 'nextField',
            'click .processCSV'   : 'processCSV'
        },
        nextField: function( e ){
            var item = $( e.currentTarget );
            var text = item.text();
            this.$( '.matched-columns' ).find( 'p[data-field="' + this.fields[ this.count ] + '"] .column-matcher-value' ).html( text );
            item.hide();
            this.count++;
            if( this.count > 5 ){
                this.$el.append( '<a href="#" class="btn processCSV">Process CSV</a>' );
                return;
            }
            this.$( '.matched-columns' ).append( this.app.templates.partials.columnMatcher({ Field: this.fields[ this.count ] }) );
        },
        processCSV: function( e ){
            e.preventDefault();
            console.log( 'hey' );
        },
		render: function () {
			this.$el.html(this.app.templates.modals.csvkeys({ Headers: this.headers }));
            this.$( '.matched-columns' ).append( this.app.templates.partials.columnMatcher({ Field: 'name' }) );
			return this;
		},
		close: function () {
			this.remove();
			this.parent.remove();
		}
	});

}());
