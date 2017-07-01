/*global module,require,global*/
(function () {
	'use strict';

	var Backbone     = require('backbone'),
		$            = require('jquery'),
		_            = require('lodash'),
		Collection   = require('../collections/BaseCollection');

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
		},
		events: {
			'click .addOne'       : 'add',
			'keyup .input--text'  : 'updateInputs',
			'click .delete'       : 'delete'
		},
		add: function( e ){
			var self = this;
			e.preventDefault();
			this.addItem();
			setTimeout( function(){
				self.$( '.lot__details[data-id]' ).last().find( 'input' ).first().focus();
				self.$( '.lot__details[data-id]' ).last().append( '<a href="#" class="btn btn--accent action delete">Delete</a>' );
			}, 0 );
		},
		addItem: function(){
			var item;
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
			item = _.findIndex( this.data.items, { 'id': id } );
			this.data.items.splice( item, 1 );
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
