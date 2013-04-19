define(function(require, exports, module) {
	"use strict";
	
	require('jqgrid');
	require('jqgrid-locale');
	
	var sandbox = require('sandbox.admin.log');
	
	if(seajs.config.data.development){
		require.async('../css/style.css');
	}
	
	var MainView = require('./view/main');
	var view;
	
	return function(options) {
		var page = options.args[0];
		
		if(page == "query"){
			if(!view){
				view  = new MainView;
				$(options.elements).html(view.el);
				// 后渲染grid,否则获取不到分页栏的id
				view.renderGrid();
			} 
		}
	}
	
});