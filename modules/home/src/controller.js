define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.home'),
		MainView = require('./view/main'),
		homeView;
	
	return function(options) {
		var dom = $(options.element);
		
		if(!homeView){
			homeView = new MainView({
		        el: dom
		    });
		}
	}
});