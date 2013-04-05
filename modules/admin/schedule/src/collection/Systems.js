define(function(require, exports, module) {
	var systemModel = require("../model/SystemModel");
	
	var Systems = Backbone.Collection.extend({
	    model: systemModel,
	    url: function(){
	    	return 'resources/json/systemName.json';
	    }
	});
	
	return Systems;
});