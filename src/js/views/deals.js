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
			this.defaults = {
				count: 0,
				total: 0,
				units: 0,
				unitCost: 0,
				unitsRemaining: 0,
				unitsUsed: 0,
				discount: 0,
				items: [{
					id: 1,
					isCalculated: true,
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
				}],
				fees: {
					rates: 0.1205,
					transactionFee: 0.30
				},
				return: 0,
				profit: 0,
				profitDisplay: '$0',
				purchase: 0,
				freight: 0,
				premium: 0,
				residential: 90,
				liftGate: 65,
				wire: 30
			};
			this.app = options.app;
			this.data = _.clone( this.defaults );
			if( options.slug && localStorage[options.slug] ) {
				this.data = JSON.parse( localStorage.getItem( options.slug ) );
			}
			this.render();
			_.bindAll( this, 'processData' );
			_.bindAll( this, 'addMultiple' );
		},
		events: {
			'click .addOne'      : 'add',
			'keyup .input--text' : 'updateInputs',
			'change .checkbox__input' : 'useDiscount',
			'click .delete'      : 'delete',
			'change #fileUpload' : 'fileUpload',
			'click .item-calc'   : 'goToItem',
			'click .resetPage'   : 'resetPage',
			'click .savePage'    : 'savePage',
			'click .deleteLocalStorage' : 'deleteLocalStorage'
		},
		resetPage: function( e ){
			e.preventDefault();
			this.data = _.clone( this.defaults );
			Backbone.history.navigate('/', {trigger: true});
			this.render();
		},
		savePage: function( e ){
			e.preventDefault();
			if( this.data.total !== 0 && this.data.profit !== 0 && this.data.purchase !== 0 && this.data.sales !== 0 ){
				this.app.eventAggregator.trigger( 'launchModal', 'Save', {data: this.data} );
			}
		},
		deleteLocalStorage: function( e ){
			e.preventDefault();
			localStorage.removeItem( $( e.currentTarget ).data( 'id' ) );
			var links = this.getLocalStorageLinks();
			this.$( 'ul.local-storage-links' ).html( links.join( '' ) );
		},
		getLocalStorageLinks: function(){
			var lsKeys = [];
			for ( var i = 0, len = localStorage.length; i < len; ++i ) {
				var item = localStorage.key( i );
				lsKeys.push( '<li><a href="/deals/' + item + '">' + item + '</a> | <a href="#" class="deleteLocalStorage" data-id="' + item + '">Delete</a></li>' );
			}
			return lsKeys;
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
			this.data.items = [];
			_.each( this.json, function( data ){
				var item = {
					id: self.data.items.length + 1,
					name: data[ dataKeys.name ],
					number: Number( data[ dataKeys.number ] ),
					estimate: Number( data[ dataKeys.number ] ),
					price: Number( data[ dataKeys.price ] ),
					shipping: Number( dataKeys.shipping ),
					isCalculated: true
				};
				self.data.items.push( item );
			});
			this.render();
		},
		add: function( e ){
			if( e ){
				e.preventDefault();
			}
			var item, id;
			id = this.data.items.length + 1;
			item = {
				id: id,
				name: 'Item ' + id,
				isCalculated: true,
				number: 1,
				estimate: 1,
				price: 0,
				shipping: 0,
				totals: {
					sales: 0,
					fees: 0,
					ship: 0,
					return: 0
				}
			};
			this.data.items.push( item );
			this.render();
			this.$( '.calculations' ).html( this.app.templates.partials.calc({ Data: this.data }) );
		},
		updateInputs: function( e ){
			var input, value, parent, inputs, id, itemIndex, update, useDiscount, actualPrice;
			input = $( e.currentTarget );
			value = input.val();
			parent = input.closest( '.lot__details' );
			inputs = parent.find( 'input' );
			id = parent.data( 'id' );
			itemIndex = this.data.items.findIndex( function( dataItem ) { return dataItem.id === id; });
			update = inputs.length === inputs.filter( function() {return this.value.length > 0;}).length;
			if( value.length ){
				if( input.hasClass( 'massDiscount' ) ){
					this.data.discount = this.$( '.massDiscount' ).val();
					this.$( 'input[data-type="price"]' ).trigger( 'keyup' );
				}
				if( input.hasClass( 'item--data' ) ){
					if( input.hasClass( 'input--item' ) ){
						parent.find( '.item' ).html( input.val() );
					} else {
						value = Number( value.replace( /\$|\,/g, '' ) );
					}
					if( input.data( 'type' ) === 'price' ){
						useDiscount = parent.find( 'input[data-type="useDiscount"]' )[0].checked;
						actualPrice = value;
						if( useDiscount ){
							actualPrice = value * (100 - this.data.discount)/100;
						}
						parent.find( 'input[data-type="actualPrice"]' ).val( actualPrice ).siblings( 'label' ).addClass( 'labelize' );
						this.data.items[ itemIndex ].actualPrice = actualPrice;
					}
					this.data.items[ itemIndex ][ input.data( 'type' ) ] = value;
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
		useDiscount: function( e ){
			var input, value, parent, id, item, price, actualPrice;
			input = $( e.currentTarget );
			value = input[0].checked;
			parent = input.closest( '.lot__details' );
			id = parent.data( 'id' );
			item = this.data.items.find( function( dataItem ){ return dataItem.id === id; });
			price = item.price;
			actualPrice = price;

			if( value ){
				actualPrice = price * (100 - this.data.discount)/100;
			}
			parent.find( 'input[data-type="actualPrice"]' ).val( actualPrice ).siblings( 'label' ).addClass( 'labelize' );
			item.actualPrice = actualPrice;
			this.calc( id );
			this.updateTotals();
		},
		checkInputs: function( id ){
			var item, numbers;
			item = this.data.items.find( function( dataItem ){ return dataItem.id === id; });
			numbers = ! Number( item.shipping ) || ! Number( item.estimate ) || ! Number( item.actualPrice ) || ! Number( item.number );
			item.isError = numbers;
			this.$( '.lot__details.item-' + id )[ numbers ? 'addClass' : 'removeClass' ]( 'input-error' );
		},
		updateTotals: function( ){
			var data = this.data;

			// Purchase details
			data.purchase = Number( this.$( '.number--purchase' ).val() );
			data.freight = Number( this.$( '.number--freight' ).val() );
			data.premium = Number( this.$( '.number--premium' ).val() );

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
				sales : Math.round( item.estimate * item.actualPrice ),
				ship  : Math.round( item.estimate * item.shipping ),
				fees  : Math.round( item.estimate * ( item.actualPrice * fees.rates + fees.transactionFee ) )
			};
			item.totals.return = item.totals.sales - item.totals.ship - item.totals.fees;
		},
		delete: function( e ){
			e.preventDefault();
			var el, parent, itemIndex, id;
			el = $( e.currentTarget );
			parent = el.closest( '.lot__details' );
			id = parent.data( 'id' );
			itemIndex = this.data.items.findIndex( function( dataItem ){ return dataItem.id === id; });
			this.data.items[ itemIndex ] = {
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
			var template, layout, lsKeys = [], links  = '';
			lsKeys = this.getLocalStorageLinks();
			template = this.app.templates.deals({Data: this.data});
			layout = '<div class="width-wrapper">' + template + '<ul class="local-storage-links">' + lsKeys.join( '' ) + '</ul>' + '</div>';

			this.$el.html( layout );
			this.$( '.input--labelize[value]' ).siblings( 'label' ).addClass( 'labelize' );
			_.each( this.$( 'input' ).trigger( 'keyup' ) );
			return this;
		},
		close: function () {
			this.remove();
		}
	});
}());
