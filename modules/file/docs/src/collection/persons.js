define(function(require, exports, module) {
	var personModel = require("../model/personModel");
	
	var Persons = Backbone.Collection.extend({
	    model: personModel,
	    
	    url: function(){
	    	return 'filesusers/like';
	    } 
	});
	
	return Persons;
});