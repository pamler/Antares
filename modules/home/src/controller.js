define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.home'),
		MainView = require('./view/main'),
		homeView;
	
	return function(options) {
		if(!homeView){
			homeView = new MainView;
			$(options.element).append(homeView.el);
		}
	}
});