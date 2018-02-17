"use strict";
var Handlebars = require("handlebars");
Handlebars.registerHelper("ifCond", function(v1, v2, options) {if(v1 === v2) {return options.fn(this);}return options.inverse(this);});

exports["deals"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"reset-container\">\n    <a href=\"#\" class=\"btn btn--accent resetPage\">Reset</a>\n    <a href=\"#\" class=\"btn btn--primary savePage\">Save</a>\n</div>\n<div class=\"lot items\">\n    <div class=\"lot__details\">\n        <h3>Lot Details</h3>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total number--purchase\" value=\""
    + alias4(((helper = (helper = helpers.purchase || (depth0 != null ? depth0.purchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"purchase","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Purchase Price</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize number--total\" value=\""
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Total Items</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total number--freight\" value=\""
    + alias4(((helper = (helper = helpers.freight || (depth0 != null ? depth0.freight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"freight","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Freight Cost</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize massDiscount\" value=\""
    + alias4(((helper = (helper = helpers.discount || (depth0 != null ? depth0.discount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"discount","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Mass Discount %</label>\n        </div>\n    </div>\n    <div class=\"lot__details additional-fees\">\n        <h3>Additional Fees</h3>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total number--premium\" value=\""
    + alias4(((helper = (helper = helpers.premium || (depth0 != null ? depth0.premium : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"premium","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Buyers Premium</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" value=\""
    + alias4(((helper = (helper = helpers.residential || (depth0 != null ? depth0.residential : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"residential","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Residential Fee</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" value=\""
    + alias4(((helper = (helper = helpers.liftGate || (depth0 != null ? depth0.liftGate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"liftGate","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Lift Gate Fee</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize total\" value=\""
    + alias4(((helper = (helper = helpers.wire || (depth0 != null ? depth0.wire : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wire","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Wire Fee</label>\n        </div>\n        <h3>eBay Fees</h3>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize rates\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.fees : depth0)) != null ? stack1.rates : stack1), depth0))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Fee Rates</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize transactionFee\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.fees : depth0)) != null ? stack1.transactionFee : stack1), depth0))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Transaction Fee</label>\n        </div>\n    </div>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <a href=\"#\" class=\"action addOne btn\">Add Item</a>\n</div>\n<div class=\"calculations\"></div>\n<input type=\"file\" id=\"fileUpload\">\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isCalculated : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"lot__details item-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        <h3 class=\"item\">Item "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "</h3>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize input--item item--data\" data-type=\"name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Item</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize input--number item--data\" data-type=\"number\" value="
    + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"number","hash":{},"data":data}) : helper)))
    + " />\n            <label for=\"\" class=\"input__label label--labelize\">Item Count</label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize input--estimate item--data\" data-type=\"estimate\" value=\""
    + alias4(((helper = (helper = helpers.estimate || (depth0 != null ? depth0.estimate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estimate","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Sellable Items</span></label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize input--price item--data\" data-type=\"price\" value="
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + " />\n            <label for=\"\" class=\"input__label label--labelize\">Price</span></label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--remember flex-parent__center-cross flex-parent__flex-end\">\n            <p class=\"checkbox__label input__label flex-child__auto styled-p\">Use Discount</p>\n            <input id=\"useDiscount-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" type=\"checkbox\" class=\"checkbox__input\" data-type=\"useDiscount\" checked>\n            <label for=\"useDiscount-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"checkbox__graphic flex-child__auto\"></label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize input--price item--data\" data-type=\"actualPrice\" disabled />\n            <label for=\"\" class=\"input__label label--labelize\">Actual Price</span></label>\n        </div>\n        <div class=\"input__wrapper input__wrapper--labelize\">\n            <input type=\"text\" class=\"input--text input--labelize input--shipping item--data\" data-type=\"shipping\" value=\""
    + alias4(((helper = (helper = helpers.shipping || (depth0 != null ? depth0.shipping : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipping","hash":{},"data":data}) : helper)))
    + "\" />\n            <label for=\"\" class=\"input__label label--labelize\">Shipping</label>\n        </div>\n        <a href=\"#\" class=\"btn btn--accent action delete\">Delete</a>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["with"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.Data : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
exports["modals"] = exports["modals"] || {};
exports["modals"]["baseModal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal__inner\">\n    <div class=\"modal__content\">\n        <h2>This is a modal</h2>\n    </div>\n</div>\n";
},"useData":true});
exports["modals"]["csvkeys"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <a href=\"#\" class=\"styled--link columnMatcher\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2 class=\"modal__header\">Choose Columns to Match</h2>\n<div class=\"styled-p matched-columns\"></div>\n<div class=\"columnMatcher-container\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.Headers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\"btn-container\">\n    <a class=\"btn btn--accent reset\">Reset</a>\n</div>\n";
},"useData":true});
exports["modals"]["save"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h2 class=\"modal__header\">Give this a name</h2>\n<div class=\"input__wrapper input__wrapper--labelize\">\n    <input type=\"text\" class=\"input--text input--labelize total page-name\" />\n    <label for=\"\" class=\"input__label label--labelize\">Page Name</label>\n</div>\n<div class=\"btn-container\">\n    <a class=\"btn cancelSave\">Cancel</a>\n    <a class=\"btn btn--accent saveState\">Save</a>\n</div>\n";
},"useData":true});
exports["partials"] = exports["partials"] || {};
exports["partials"]["calc"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

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
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isCalculated : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "            <div class=\"calc calc-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " item-calc"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isError : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                <h3>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.name : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "</h3>\n                <p>Sales: <span class=\"value\">$"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.totals : depth0)) != null ? stack1.sales : stack1), depth0))
    + "</span></p>\n                <p>Return: <span class=\"value\">$"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.totals : depth0)) != null ? stack1["return"] : stack1), depth0))
    + "</span></p>\n            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " input-error";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)));
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Item "
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["with"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.Data : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
exports["partials"]["columnMatcher"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p class=\"empty\" data-field=\""
    + alias4(((helper = (helper = helpers.Field || (depth0 != null ? depth0.Field : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Field","hash":{},"data":data}) : helper)))
    + "\">Field Name: <strong>"
    + alias4(((helper = (helper = helpers.Field || (depth0 != null ? depth0.Field : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Field","hash":{},"data":data}) : helper)))
    + "</strong><span class=\"column-matcher-text\"> -- Column Name: <strong class=\"column-matcher-value\"></strong></span></p>\n";
},"useData":true});
exports["partials"]["deal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"lot__details item-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <h3 class=\"item\">Item "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "</h3>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--item item--data\" data-type=\"name\" />\n        <label for=\"\" class=\"input__label label--labelize\">Item</label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--number item--data\" data-type=\"number\" />\n        <label for=\"\" class=\"input__label label--labelize\">Item Count</label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--estimate item--data\" data-type=\"estimate\" />\n        <label for=\"\" class=\"input__label label--labelize\">Sellable Items</span></label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--price item--data\" data-type=\"price\" />\n        <label for=\"\" class=\"input__label label--labelize\">Price</span></label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--remember flex-parent__center-cross flex-parent__flex-end\">\n        <p class=\"checkbox__label input__label flex-child__auto styled-p\">Use Discount</p>\n        <input id=\"useDiscount-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" type=\"checkbox\" class=\"checkbox__input\" data-type=\"useDiscount\" checked>\n        <label for=\"useDiscount-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"checkbox__graphic flex-child__auto\"></label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--price item--data\" data-type=\"actualPrice\" disabled />\n        <label for=\"\" class=\"input__label label--labelize\">Actual Price</span></label>\n    </div>\n    <div class=\"input__wrapper input__wrapper--labelize\">\n        <input type=\"text\" class=\"input--text input--labelize input--shipping item--data\" data-type=\"shipping\" />\n        <label for=\"\" class=\"input__label label--labelize\">Shipping</label>\n    </div>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return container.escapeExpression(helpers.log.call(alias1,"im using this template",{"name":"log","hash":{},"data":data}))
    + "\n"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.Data : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});