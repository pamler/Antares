define(function(require, exports, module) {
	var funModel = require("../model/FunModel");
	
	var Funcs = Backbone.Collection.extend({
	    model: funModel
	});
	
	return Funcs;
});