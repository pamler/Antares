define(function(require, exports, module) {
	"use strict";
	
	var PersonModel = Backbone.Model.extend({
	    defaults: {
	    	username: '',
			instId:'',
			userId:'',
			instname: ''
	    }
	   
	  });
	return PersonModel;
});