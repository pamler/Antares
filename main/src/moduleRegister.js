define(function(require, exports, module) {
	"use strict";
	
	var core = require('aura_core'),
		perms = require('aura_perm'),
		tab = require('./tab'),
		moduleArr = seajs.config.data.modules;
	
	exports.init = function(){
		for(var i = 0; i < moduleArr.length; i++){
			var moduleName = moduleArr[i].name;
			var eventName = 'route.' + moduleName + '.**';
			core.on(eventName, callback, this);
		}
	}
	
	function callback(){
		// 从hash路径中提取模块名
		var url = Array.prototype.slice.call(arguments, 0).join('.'),
			moduleName,
			len = 0, 
			matchLen = 0,
			moduleObj = {},
			args;
		for(var i = 0; i < moduleArr.length; i++){
			if(url.indexOf(moduleArr[i].name) != -1){
				matchLen = moduleArr[i].name.length;
				if(matchLen > len){
					moduleName = moduleArr[i].name;
					len = matchLen;
				}
			}
		}
		
		// 从hash路径中提取参数
		args = url.replace(moduleName, '').substr(1).split('.');
		if(url.indexOf('admin.schedule.schInfo') != -1){
			url = 'admin.schedule.schInfo';
		}
		moduleObj[moduleName] = {
			options: {
				args: args,
				elements: '#tab-' + url.replace(/\./g, '-')
			}	
		};
		// 新建或打开已有的tab页
		tab.createNewSheet(url.replace(/\./g, '-'), perms.getTitle(url) || '默认页面');
		setTimeout(function(){
			core.start(moduleObj);
		}, 400);
	}
});