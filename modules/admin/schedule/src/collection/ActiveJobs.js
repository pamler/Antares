define(function(require, exports, module) {
	"use strict";
	var activeJobModel = require("../model/ActiveJobModel");
	
	var ActiveJobs = Backbone.Collection.extend({
	    model: activeJobModel
	  
	});
	
	return ActiveJobs;
});