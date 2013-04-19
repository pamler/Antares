define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.home'),
		MainView = require('./view/main'),
		homeView;
	
	if(seajs.config.data.development){
		require.async('../css/style.css');
	}
	
	return function(options) {
		if(!homeView){
			homeView = new MainView;
			$(options.element).append(homeView.el);
		}
	}
});