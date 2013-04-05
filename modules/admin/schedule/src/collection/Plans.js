define(function(require, exports, module) {
	var planModel = require("../model/Plan");
	
	var Plans = Backbone.Collection.extend({
	    model: planModel
	  
	});
	
	return Plans;
});