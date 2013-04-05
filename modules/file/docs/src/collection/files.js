define(function(require, exports, module) {
	"use strict";
	
	var fileModel = require("../model/fileModel");
	
	var Files = Backbone.Collection.extend({
	    model: fileModel
	});
	
	return Files;
});