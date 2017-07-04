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
                3: 'price',
                4: 'shipping'
            };
			this.render();
		},
        events: {
            'click .columnMatcher'    : 'updateResult',
            'keyup .input--shipping'  : 'updateResult',
            'click .reset'            : 'reset',
            'click .processCSV'       : 'processCSV'
        },
        updateResult: function( e ){
            var element, isInput, value, target, input;
            element = $( e.currentTarget );
            isInput = element[0].nodeName === "INPUT";
            value = element[ isInput ? 'val' : 'text' ]();
            target = this.$( 'p[data-field="' + this.fields[ this.count ] + '"]' );

            input = '<div class="input__wrapper input__wrapper--labelize">';
            input += '<input type="tel" class="input--text input--labelize input--shipping">';
            input += '<label for="" class="input__label label--labelize">Shipping</label>';
            input += '</div>';

            if( value.length > 0 ){
                target.find( '.column-matcher-value' ).html( value );
                target.removeClass( 'empty' );
                if( isInput && this.$( '.processCSV' ).length < 1 ){
                    this.$( '.btn-container' ).append( '<a href="#" class="btn processCSV">Process CSV</a>' );
                }
            }
            if( this.count < 4 ){
                this.count++;
                // Remove item from list
                element.remove();
                // Add next field
                this.$( '.matched-columns' ).append( this.app.templates.partials.columnMatcher({ Field: this.fields[ this.count ] }) );
            }

            if( this.count === 4 && ! isInput ){
                this.$( '.columnMatcher-container' ).html( '<p>Enter base shipping amount</p>' + input );
                this.$( 'input' ).focus();
            }
        },
        reset: function( e ){
            e.preventDefault();
            this.count = 1;
            this.render();
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
