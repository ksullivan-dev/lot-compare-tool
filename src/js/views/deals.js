/*global module,require,global*/
(function () {
	'use strict';

	var Backbone     = require('backbone'),
		$            = require('jquery'),
		_            = require('lodash'),
		Model        = require('../models/BaseModel');

	module.exports = Backbone.View.extend({
		className: 'content--deals',
		tagName: 'section',
		initialize: function ( options ) {
			var self = this;
			this.app = options.app;
			this.data = {
				count: 0,
				total: 0,
				units: 0,
				unitCost: 0,
				unitsRemaining: 0,
				unitsUsed: 0,
				items: [],
				fees: {},
				return: 0,
				profit: 0,
				profitDisplay: '$0'
			};
			this.render();
			_.bindAll( this, 'processData' );
			_.bindAll( this, 'addMultiple' );
		},
		events: {
			'click .addOne'      : 'add',
			'keyup .input--text' : 'updateInputs',
			'click .delete'      : 'delete',
			'change #fileUpload' : 'fileUpload',
			'click .item-calc'   : 'goToItem',
			'click .resetPage'   : 'resetPage'
		},
		resetPage: function( e ){
			e.preventDefault();
			this.data = {
				count: 0,
				total: 0,
				units: 0,
				unitCost: 0,
				unitsRemaining: 0,
				unitsUsed: 0,
				items: [],
				fees: {},
				return: 0,
				profit: 0,
				profitDisplay: '$0'
			};
			this.render();
		},
		goToItem: function( e ){
			var el, id, form, offset;
			el = $( e.currentTarget );
			id = el.data( 'id' );
			form = this.$( '.lot__details.item-' + id );
			offset = form.offset().top;
			$( 'html, body' ).animate({ scrollTop: offset - 100  }, 600 );
			form.addClass( 'notice' );
			form.find( 'input' ).first().focus();
			setTimeout( function(){
				form.removeClass( 'notice' );
			}, 1000 );
		},
		fileUpload: function( e ){
			var file, reader;
			file = e.target.files[0];
			reader = new FileReader();
			reader.readAsText( file );
			reader.onload = this.processData;
		},
		processData: function( e ){
			var data, rows, headers;
			data = e.target.result;
			rows = data.split( /\r\n|\n/ );
			headers = rows[0].split( ',' );
			this.json = [];
			for( var i = 1; i<rows.length; i++ ){
				if( rows[i] !== '' ){
					var object, cols;
					object = {};
					cols = rows[i].split( ',' );
					for( var x = 0; x<cols.length; x++ ){
						object[headers[x]] = cols[x];
					}
					this.json.push( object );
				}
			}
			this.createKeys( headers );
		},
		createKeys: function( headers ){
			var modalOptions;
			this.keyedData = new Model();
			modalOptions = {
				headers: headers,
				data: this.keyedData
			};
			this.app.eventAggregator.trigger( 'launchModal', 'CSVKeys', modalOptions );
			this.keyedData.listenTo( this.keyedData, 'change', this.addMultiple );
		},
		addMultiple: function( model ){
			var self, dataKeys;
			self = this;
			dataKeys = model.toJSON();
			_.each( $( '.lot__details[data-id]' ), function( details ){
				$( details ).find( '.delete' ).trigger( 'click' );
			});
			this.updateTotals();
			function updateInputFromCSV( element, data, inputName, dataKey ){
				var value;
				if( ! dataKey ){
					dataKey = inputName;
				}
				value = data[ dataKeys[ dataKey ] ];
				if( inputName === "shipping" ){
					value = dataKeys[ dataKey ];
				}
				element.find( 'input[data-type=' + inputName + ']' ).val( value ).trigger( 'keyup' );
			}
			_.each( this.json, function( data ){
				var element;
				self.add();
				element = self.$( '.lot__details[data-id=' + self.data.count + ']' );
				updateInputFromCSV( element, data, "name");
				updateInputFromCSV( element, data, "number" );
				updateInputFromCSV( element, data, "estimate", "number" );
				updateInputFromCSV( element, data, "price" );
				updateInputFromCSV( element, data, "shipping" );
			});
		},
		add: function( e ){
			var self = this;
			if( e ){
				e.preventDefault();
			}
			this.addItem();
		},
		addItem: function(){
			var item, self;
			self = this;
			this.data.count++;
			item = {
				id: this.data.count,
				name: 'Item ' + this.data.count,
				isCalculated: true,
				totals: {
					sales: 0,
					fees: 0,
					ship: 0,
					return: 0
				}
			};
			this.data.items.push( item );
			this.$( '.addOne' ).before( this.app.templates.partials.deal({ count: this.data.count }) );
			this.$( '.lot__details[data-id=' + this.data.count + ']' ).find( 'input' ).first().focus();
			this.$( '.lot__details[data-id=' + this.data.count + ']' ).append( '<a href="#" class="btn btn--accent action delete">Delete</a>' );
			this.$( '.calculations' ).html( this.app.templates.partials.calc({ Data: this.data }) );
		},
		updateInputs: function( e ){
			var input, value, parent, inputs, id, update;
			input = $( e.currentTarget );
			value = input.val();
			parent = input.closest( '.lot__details' );
			inputs = parent.find( 'input' );
			id = parent.data( 'id' );
			update = inputs.length === inputs.filter( function() {return this.value.length > 0;}).length;
			if( value.length ){
				if( input.hasClass( 'item--data' ) ){
					if( input.hasClass( 'input--item' ) ){
						parent.find( '.item' ).html( input.val() );
					} else {
						value = Number( value.replace( /\$|\,/g, '' ) );
					}
					this.data.items[ id - 1 ][ input.data( 'type' ) ] = value;
					this.calc( id );
					if( update ){
						this.checkInputs( id );
					}
				}
				if( update ){
					this.updateTotals();
				}
			}
		},
		checkInputs: function( id ){
			var item, numbers;
			item = this.data.items[ id - 1 ];
			numbers = ! Number( item.shipping ) || ! Number( item.estimate ) || ! Number( item.price ) || ! Number( item.number );
			item.isError = numbers;
			this.$( '.lot__details.item-' + id )[ numbers ? 'addClass' : 'removeClass' ]( 'input-error' );
		},
		updateTotals: function( ){
			var data = this.data;

			// Totals
			data.total = 0;
			$( '.total' ).each( function( idx, el ){
				data.total += Number( el.value );
			});

			// Fees
			data.fees.rates = Number( this.$( '.rates' ).val() );
			data.fees.transactionFee = Number( this.$( '.transactionFee' ).val() );

			// Update total return and total items used
			data.return = 0;
			data.unitsUsed = 0;
			_.each( data.items, function( loopItem ){
				if( loopItem.totals ){
					data.return += loopItem.totals.return;
					data.unitsUsed += loopItem.number;
				}
			});

			// Units
			data.units = Number( this.$( '.number--total' ).val() );
			data.unitCost = ( data.total / data.units ).toFixed( 3 );
			data.unitsRemaining = data.units - data.unitsUsed ;

			// Profit
			data.profit = data.return - data.total;
			data.profitDisplay = '$' + Math.abs( data.profit );
			if( data.profit < 0 ){
				data.profitDisplay = '-' + data.profitDisplay;
			}

			// Render calculations
			this.$( '.calculations' ).html( this.app.templates.partials.calc({ Data: this.data }) );
		},
		calc: function( id ){
			var self, item, fees;
			self = this;
			item = _.find( this.data.items, { 'id': id } );
			fees = this.data.fees;
			item.totals = {
				sales : Math.round( item.estimate * item.price ),
				ship  : Math.round( item.estimate * item.shipping ),
				fees  : Math.round( item.estimate * ( item.price * fees.rates + fees.transactionFee ) )
			};
			item.totals.return = item.totals.sales - item.totals.ship - item.totals.fees;
		},
		delete: function( e ){
			e.preventDefault();
			var el, parent, item, id;
			el = $( e.currentTarget );
			parent = el.closest( '.lot__details' );
			id = parent.data( 'id' );
			this.data.items[ id - 1 ] = {
				isCalculated: false,
				estimate: 0,
				number: 0,
				price: 0,
				shipping: 0,
				totals: {
					fees: 0,
					return: 0,
					sales: 0,
					ship: 0
				}
			};
			parent.remove();

			this.updateTotals();
		},
		render: function () {
			var template, layout;
			template = this.app.templates.deals();
			layout = '<div class="width-wrapper">' + template + '</div>';
			this.$el.html( layout );
			this.$( '.input--labelize[value]' ).siblings( 'label' ).addClass( 'labelize' );
			this.addItem();
			return this;
		},
		close: function () {
			this.remove();
		}
	});
}());
