/*global require,exports*/

"use strict";
var Handlebars = require("handlebars");

exports["deals"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"lot items\">\n    <div class=\"lot__details\">\n        <h3>Lot Details</h3>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" />\n            <label for=\"\" class=\"input__label label--labelize\">Purchase Price</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize number--total\" />\n            <label for=\"\" class=\"input__label label--labelize\">Total Items</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" />\n            <label for=\"\" class=\"input__label label--labelize\">Freight Cost</label>\n        </div>\n    </div>\n    <div class=\"lot__details additional-fees\">\n        <h3>Additional Fees</h3>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" value=\"90\" />\n            <label for=\"\" class=\"input__label label--labelize\">Residential Fee</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" value=\"65\" />\n            <label for=\"\" class=\"input__label label--labelize\">Lift Gate Fee</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" value=\"30\" />\n            <label for=\"\" class=\"input__label label--labelize\">Wire Fee</label>\n        </div>\n        <h3>eBay Fees</h3>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize rates\" value=\"0.129\" />\n            <label for=\"\" class=\"input__label label--labelize\">Fee Rates</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize transactionFee\" value=\"0.30\" />\n            <label for=\"\" class=\"input__label label--labelize\">Transaction Fee</label>\n        </div>\n    </div>\n    <a href=\"#\" class=\"action addOne btn\">Add Item</a>\n</div>\n<div class=\"calculations\"></div>\n";
},"useData":true});
exports["partials"] = exports["partials"] || {};
exports["partials"]["calc"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"calc\">\n        <h3>Details</h3>\n        <p>Total Cost: <span class=\"value\">$"
    + alias4(((helper = (helper = helpers.total || (depth0 != null ? depth0.total : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total","hash":{},"data":data}) : helper)))
    + "</span></p>\n        <p>Cost per item: <span class=\"value\">$"
    + alias4(((helper = (helper = helpers.unitCost || (depth0 != null ? depth0.unitCost : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unitCost","hash":{},"data":data}) : helper)))
    + "</span></p>\n        <p>Remaining units: <span class=\"value\">"
    + alias4(((helper = (helper = helpers.unitsRemaining || (depth0 != null ? depth0.unitsRemaining : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unitsRemaining","hash":{},"data":data}) : helper)))
    + "</span></p>\n        <p>Profit (loss): <span class=\"value\">"
    + alias4(((helper = (helper = helpers.profitDisplay || (depth0 != null ? depth0.profitDisplay : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profitDisplay","hash":{},"data":data}) : helper)))
    + "</span></p>\n    </div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression, alias3=container.lambda;

  return "        <div class=\"calc calc-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <h3>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.name : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</h3>\n            <p>Sales: <span class=\"value\">$"
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.totals : depth0)) != null ? stack1.sales : stack1), depth0))
    + "</span></p>\n            <p>Return: <span class=\"value\">$"
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.totals : depth0)) != null ? stack1["return"] : stack1), depth0))
    + "</span></p>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Item "
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["with"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.Data : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
exports["partials"]["deal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"lot__details item-"
    + alias4(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "\">\n    <h3 class=\"item\">Item "
    + alias4(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</h3>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--item item--data\" data-type=\"name\" />\n        <label for=\"\" class=\"input__label label--labelize\">Item</label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--number item--data\" data-type=\"number\" />\n        <label for=\"\" class=\"input__label label--labelize\">Item Count</label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--estimate item--data\" data-type=\"estimate\" />\n        <label for=\"\" class=\"input__label label--labelize\">Sellable Items</span></label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--price item--data\" data-type=\"price\" />\n        <label for=\"\" class=\"input__label label--labelize\">Price</span></label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--shipping item--data\" data-type=\"shipping\" />\n        <label for=\"\" class=\"input__label label--labelize\">Shipping</label>\n    </div>\n</div>\n";
},"useData":true});