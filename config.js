"use strict";

seajs.config({
	base: '.',
	alias: {
		'es5-safe': 'lib/es5-safe.js',
		'mockjax': 'lib/jquery.mockjax.js',
		'eventemitter': 'common/util/eventemitter2.js',
		'contextmenu': 'common/util/jquery.contextmenu.js',
		'bootstrap-button': 'common/util/bootstrap-button.js',
		'bootstrap-tab': 'common/util/bootstrap-tab.js',
		'bootstrap-dropdown': 'common/util/bootstrap-dropdown.js',
		'bootstrap-modal': 'common/util/bootstrap-modal.js',
		'jquery-populate': 'common/util/jquery.populate.js',
		'jqgrid': 'common/util/jquery.jqGrid.src.js',
		'jqgrid-locale': 'common/util/grid.locale-cn.js',
		'plupload': 'common/util/plupload.full.js',
		'raphael': 'common/util/raphael.js',
		
		'aura_core': 'common/aura/core.js',
		'aura_sandbox': 'common/aura/sandbox.js',
		'aura_perm': 'common/aura/permissions.js',
		'backboneSandbox': 'common/aura/backboneSandbox',
		
		'router': 'main/src/router.js'
		
	},
	
	plugins: ['nocache','shim','text','style'],
	
	preload: [
	    Function.prototype.bind ? '' : 'es5-safe',
	    (window.location.hostname == 'localhost') ? 'mockjax' : ''
	],
	
	charset: 'utf-8',
	
	auth_strict: false, // 是否前台判权限
	
	modules: [		
        {name:'menu', domain:''},
        {name:'kpi.config', domain:''},
        {name:'kpi.dsp', domain:''},
        {name:'kpi.fbmi', domain:''},
        {name:'kpi.gbmi', domain:''},
        {name:'kpi.config', domain:''},
        {name:'kpi.market', domain:''},
        {name:'file.docs', domain:''},
        {name:'admin.log', domain:''},
        {name:'admin.schedule', domain:''}
	]
});

juicer.set({
    'tag::interpolateOpen': '@{',
    'tag::noneencodeOpen': '@@{'
});

jQuery(function($){
	$.datepicker.regional['zh-CN'] = {
		closeText: '关闭',
		prevText: '&#x3C;上月',
		nextText: '下月&#x3E;',
		currentText: '今天',
		monthNames: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});