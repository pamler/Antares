define(function(require, exports, module) {
	"use strict";
	
	require('bootstrap-dropdown');
	
	var moduleReg = require('./moduleRegister'),
		core = require('aura_core'),
		backboneSandbox = require('backboneSandbox');
	
	// 给所有的ajax请求添加时间戳，防止请求被浏览器缓存
	$.ajaxSetup({
  		beforeSend: function(xhr,options){
  			if(options.url.indexOf('?') == -1){
  				options.url +='?_dc='+new Date().getTime();
  			} else {
  				options.url +='&_dc='+new Date().getTime();
  			}
	    }
	});
	
	// 判断是否需要mock data 
	if(window.location.hostname == 'localhost'){
		$.mockjax(function(settings) {
			// mock不以.json结尾的
			// 如果url以http://开头,则认为是jsonp请求,也不mock
			if(!settings.url.match(/^http:\/\//) && !settings.url.match(/.*\.json$/)){
				var service = settings.url.replace(/\/|\?|\&/g,'.');
			    if (service.length) {
			        return {
			    	    proxy: 'resources/mocks/' + service + '.json',
			    	    responseTime: 100
			        };
			    }
			}
		    return;
		});
	}
	
	exports.launch = function(){
		// 获取用户信息
		$.getJSON('users/curr',function(res){
			$('.header-info').show();
			$('.header-info .user').append(' ' + res.userName);
			// 退出
			$('.header-info .logout').click(function(){
				window.location.href = 'LogoutServlet';
			});
			// 修改密码
			$('.header-info .tool').click(function(){
				var View = require('../../modules/admin/changepwd/src/view/changePwdView'),
					view = new View();
	            // 每次new view是因为dialog关闭会把view的事件抹掉
	            art.artDialog({
	                content: view.el,
	                padding: '5px',
	                opacity:'0.2'
	            }).lock();
            });
		});
		
		// 注册模块
		moduleReg.init();
		
		core.getSandbox = function(sandbox, module) {
		    return backboneSandbox.extend(sandbox, module);
	    };
	    
	    // 右键菜单设置
	    $('#tabContextmenu a').click(function(){
			 var text = $(this).text(),
		 	     $m = $(this).closest('.context-menu'),
			 	 $tablet = $($m.data('e').target);
			 if(text == '关闭当前标签'){
			 	 $tablet.siblings('.icon-remove').click();
			 } else if(text == '关闭其他标签'){
		 		 $('#tab-navi').find('li > a').filter(function(){
		 		     return ($(this).text() != $tablet.text());
		 		 }).siblings('.icon-remove').click();
			 } else if(text == '关闭所有标签'){
			 	$('#tab-navi').find('li > a').filter(function(){
		 		     return ($(this).text() != $tablet.text());
		 		}).siblings('.icon-remove').click();
		 		//延时10ms，否则经常会剩下一个tab
		 		setTimeout(function(){
		 			$tablet.siblings('.icon-remove').click();
		 		},10);
			 }
		});
		
		// 菜单构建
		core.start({
			'menu': {
		        options: {
		            element: '.left-view'
		        }
		    }
		});
	}
	
});