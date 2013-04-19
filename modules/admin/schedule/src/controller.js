define(function(require, exports, module) {
	"use strict";
	
	require('jqgrid');
	require('jqgrid-locale');
	require('jquery-populate');
	require('bootstrap-tab');
	require('bootstrap-modal');
	
	var sandbox = require('sandbox.admin.schedule');
	
	var	JobInfoView = require('./view/jobInfoView'),
		PlanInfoView = require('./view/planInfoView'),
		LogInfoView = require('./view/schLogView'),
		ServerInfoView = require('./view/serverInfoView'),
		CacheInfoView = require('./view/cacheInfoView');
	
	if(seajs.config.data.development){
		require.async('../css/style.css');
	}
	
	var viewObj = {};
	
	return function(options) {
		var type = options.args[0];
		if(type == 'schInfo' && options.args.length == 2){
			if(!viewObj['schInfo']){
				viewObj['schInfo'] = new PlanInfoView({scheduleId:options.args[1]});
				$(options.elements).html(viewObj['schInfo'].el);
				viewObj['schInfo'].renderGrid();
			} else {
				viewObj['schInfo'].reviewPlan(options.args[1]);
			}
			
		} else if(!viewObj[type]){
			
			switch(type){
				case 'jobInfo' : 
					viewObj[type] = new JobInfoView();
					$(options.elements).html(viewObj[type].el);
					viewObj[type].renderGrid();
					break;
				case 'schInfo' : 
					viewObj[type] = new PlanInfoView();
					$(options.elements).html(viewObj[type].el);
					viewObj[type].renderGrid();
					break;
				case 'schLog' : 
					viewObj[type] = new LogInfoView();
					$(options.elements).html(viewObj[type].el);
					viewObj[type].renderGrid();
					break;
				case 'server' : 
					viewObj[type] = new ServerInfoView();
					$(options.elements).html(viewObj[type].el);
					break;
				case 'cacheInfo' : 
					viewObj[type] = new CacheInfoView();
					$(options.elements).html(viewObj[type].el);
					break;
				default : break;
			}
		}
	}
});