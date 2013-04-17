define(function(require, exports, module) {
	'use strict';
	var mchntModel = require("../model/mchnt");
	
	var Mchnts = Backbone.Collection.extend({
	    model: mchntModel
	  
	});
	
	return Mchnts;
});