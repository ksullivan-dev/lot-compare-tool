/*global module,require,global*/
(function () {
	'use strict';

	var Backbone     = require('backbone'),
		$            = require('jquery'),
		_            = require('lodash'),
		Collection   = require('../collections/BaseCollection'),
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
			'click .addOne'       : 'add',
			'keyup .input--text'  : 'updateInputs',
			'click .delete'       : 'delete',
			'change #fileUpload'  : 'fileUpload'
		},
		fileUpload: function( e ){
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.readAsText( file );
			reader.onload = this.processData;
		},
		processData: function( e ){
			var data = e.target.result;
			var rows = data.split( /\r\n|\n/ );
			var headers = rows[0].split( ',' );
			this.json = [];
			for( var i = 1; i<rows.length; i++ ){
				if( rows[i] !== '' ){
					var object = {};
					var cols = rows[i].split( ',' );
					for( var x = 0; x<cols.length; x++ ){
						object[headers[x]] = cols[x];
					}
					this.json.push( object );
				}
			}
			this.keyedData = new Model();
			var modalOptions = {
				headers: headers,
				data: this.keyedData
			};
			this.app.eventAggregator.trigger( 'launchModal', 'CSVKeys', modalOptions );
			this.keyedData.listenTo( this.keyedData, 'change', this.addMultiple );
		},
		addMultiple: function( model ){
			var self = this;
			var dataKeys = model.toJSON();
			_.each( $( '.lot__details[data-id]' ), function( details ){
				$( details ).find( '.delete' ).trigger( 'click' );
			});
			this.updateTotals();
			var updateInputFromCSV = function( element, data, inputName, dataKey ){
				var value;
				if( ! dataKey ){
					dataKey = inputName;
				}
				value = data[ dataKeys[ dataKey ] ];
				if( inputName === "shipping" ){
					value = dataKeys[ dataKey ];
				}
				element.find( 'input[data-type=' + inputName + ']' ).val( value ).trigger( 'keyup' );
			};
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
			var input, value, parent, id, update;
			input = $( e.currentTarget );
			value = input.val();
			parent = input.closest( '.lot__details' );
			id = parent.data( 'id' );
			$( parent.find( 'input' ) ).each( function( idx, el ){
				update = el.value.length;
			});
			if( value.length ){
				if( input.hasClass( 'item--data' ) ){
					if( input.hasClass( 'input--item' ) ){
						parent.find( '.item' ).html( input.val() );
					} else {
						value = Number( value );
					}
					this.data.items[ id - 1 ][ input.data( 'type' ) ] = value;
					this.calc( id );
				}
				if( update ){
					this.updateTotals();
				}
			}
		},
		updateTotals: function( ){
			var data = this.data;

			// Totals
			data.total = 0;
			$( '.total' ).each( function( idx, el ){
				data.total += Number( el.value );
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

			// Fees
			data.fees.rates = Number( this.$( '.rates' ).val() );
			data.fees.transactionFee = Number( this.$( '.transactionFee' ).val() );

			// Render calculations
			this.$( '.calculations' ).html( this.app.templates.partials.calc({ Data: this.data }) );
		},
		calc: function( id ){
			var self, item, fees;
			self = this;
			item = _.find( this.data.items, { 'id': id } );
			fees = this.data.fees;
			item.totals = {
				sales : parseInt( item.estimate * item.price ),
				ship  : parseInt( item.estimate * item.shipping ),
				fees  : parseInt( item.estimate * ( item.price * fees.rates + fees.transactionFee ) )
			};
			item.totals.return = parseInt( item.totals.sales - item.totals.ship - item.totals.fees );

			this.data.return = 0;
			this.data.unitsUsed = 0;
			_.each( this.data.items, function( loopItem ){
				if( loopItem.totals ){
					self.data.return += loopItem.totals.return;
					self.data.unitsUsed += loopItem.estimate;
				}
			});
		},
		delete: function( e ){
			e.preventDefault();
			var el, parent, item, id;
			el = $( e.currentTarget );
			parent = el.closest( '.lot__details' );
			id = parent.data( 'id' );
			this.data.items[ id - 1 ] = {
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

			// Render calculations
			this.$( '.calculations' ).html( this.app.templates.partials.calc({ Data: this.data }) );
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
