define(function(require, exports, module) {
	var labelModel = require("../model/labelModel");
	
	var Labels = Backbone.Collection.extend({
	    model: labelModel
	});
	
	return Labels;
});