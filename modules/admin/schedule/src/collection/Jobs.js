define(function(require, exports, module) {
	var jobModel = require("../model/Job");
	
	var Jobs = Backbone.Collection.extend({
	    model: jobModel
	  
	});
	
	return Jobs;
});