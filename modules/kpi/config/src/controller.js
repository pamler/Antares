define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.kpi.config');
	var MainView = require('./view/main');
	var view;
	
	if(seajs.config.data.development){
		require.async('../css/style.css');
	}
	
	return function(options) {
		var arg = options.args[0];
		if(arg == 'dsp' && !view){
			view = new MainView().el;
			
			sandbox.on('initialized', function(){
				$(options.elements).html(view);
			});
		}
	}
});