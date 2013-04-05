define(function(require, exports, module) {
	var svcModel = require("../model/SvcModel");
	
	var Servs = Backbone.Collection.extend({
	    model: svcModel
	});
	
	return Servs;
});