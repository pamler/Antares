define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.kpi.gbmi');
	var MainView = require('./view/main');
	var viewObj = {};
	
	if(seajs.config.data.development){
		require.async('../css/style.css');
	}
	
	return function(options) {
		var type = options.args[0];
		if(!viewObj[type]){
			viewObj[type] = new MainView({indexType: type});
			
			sandbox.once('initialized', function(){
				$(options.elements).html(viewObj[type].el);
			});
		}
	}
});