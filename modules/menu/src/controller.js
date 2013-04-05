define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.menu'),
		MainView = require('./view/main');
	
	return function(options) {
		var dom = $(options.element);
		
		new MainView({
	        el: dom
	    });
		
		sandbox.on('initialized', function(){
			$('#loading').remove();
			dom.show().animate({left: '0px'},'fast',function(){
				$('.center-view').fadeIn('fast');
			});
		    require.async('router', function(router){
		    	new router();
		    });
		});
		
    };
});