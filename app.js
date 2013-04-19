define(function(require, exports, module) {
	"use strict";
	var mainController = require('./main/src/controller');
	
	if(!seajs.config.data.development){
		require.async('./resources/css/module-min.css');
	}
	
	// 页头页脚展现
	$('header').animate({top: '0px'},'fast');
	$('footer').animate({bottom: '0px'},'fast');
	
	// 加载loading图标
	var loadingDiv = [
	    '<div id="loading">',
		    '<div class="loading-info">',
		    	'<div class="loading-text">',
		    		'系统正在加载中，请稍候...',
		    	'</div>',
		    	'<div class="loading-ajax"></div>',
		    '</div>',
	    '</div>'
    ].join('');
	$(loadingDiv).appendTo(document.body);
	
	// leftView和centerView高度控制
	var clientHeight;
	if(navigator.userAgent.indexOf("MSIE") != -1){
		clientHeight = document.documentElement.offsetHeight;
	} else {
		clientHeight = document.body.scrollHeight;
	}
	$(window).bind("resize", function(){
		$('.left-view').css('height', clientHeight - 90);
		$('.center-view').css('height', clientHeight - 90);
	});
	$('.left-view').css('height', $('#loading').height() - 90);
	$('.center-view').css('height', $('#loading').height() - 90);
	$('#app-content').css('height', $('#loading').height() - 120);
	$('#home-content').css('height', $('#loading').height() - 95);
	
	// 主框架开始加载
	mainController.launch();
});