define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.file.docs');
	
	// 文档专区均涉及到表格，先引入
	require('jqgrid');
	require('jqgrid-locale');
	
	var uploadFileView, downloadFileView;
	
	return function(options) {
		var page = options.args[0];
		
		if(page == "manage"){
			if(!uploadFileView){
				require.async('./view/uploadFile', function(View){
					uploadFileView  = new View;
					$(options.elements).html(uploadFileView.el);
					uploadFileView.addPlupload();
				});
			} 
		} else if(page == "query"){
			if(!downloadFileView){
				require.async('./view/downloadFile', function(View){
					downloadFileView  = new View;
					$(options.elements).html(downloadFileView.el);
					// 后渲染grid,否则获取不到分页栏的id
					downloadFileView.renderGrid();
				});
			} 
		}
	}
});