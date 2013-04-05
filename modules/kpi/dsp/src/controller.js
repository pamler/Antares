define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.kpi.dsp');
	var MainView = require('./view/main');
	var dspInst = [];
	
	return function(options) {
		var inst = options.args[0];
		
		if($.inArray(inst, dspInst) == -1){
			var view = new MainView({insIdCd:inst}).el;
			dspInst.push(inst);
			
			sandbox.once('initialized', function(){
				$(options.elements).html(view);
			});
		}
	}
});