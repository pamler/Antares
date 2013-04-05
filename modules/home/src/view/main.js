define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.home');
	
	var MainView = Backbone.View.extend({
		
		initialize: function() {
			
			sandbox.emit('initialized');
	    }
	});
	
	return MainView;
});
