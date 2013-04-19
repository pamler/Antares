define(function(require, exports, module) {
	"use strict";
	
	var appTpl = require('../../html/app-item.tpl');
	
	var kpiTpl = [
        '<ul>',
            '{@each list as lt}',
            	'<li>',
            	'<b>@{lt.module}更新至@{lt.date}</b>',
            	'{@if lt.module == "机构重点数据"}',
            		'<span class="entrance" data-type=dsp data-insid=@{lt.insId}>查看</span>',
        		'{@else if lt.module == "分公司重点指标"}',
            		'<span class="entrance" data-type=bmi data-insid=@{lt.insId}>查看</span>',
            	'{@/if}',
            	'</li>',
        	'{@/each}',
    	'</ul>',
    ].join('');

	var AppView = Backbone.View.extend({
		tagName: 'div',
		className: 'span7 udp-app',
		
		events: {
            "click span.entrance": "viewDetail"
        },
		
		initialize: function() {
			var me = this;
			
			$(this.el).html(appTpl);
			
			if(this.options.appId == 2){
				me.$el.attr('data-appindex','2');
				$.ajax({
					url:'kpiInfo/kpiDate',
    				dataType:'json',
    				type:'get',
    				success:function(res){
    					var el = juicer(kpiTpl,{list:res});
    					me.$el.find('.app-logo').html('<img class="icon" src="resources/img/icon-chart.png">');
    					me.$el.find('.app-version').html('版本号：v1.1 2013-03-20 发布');
    					me.$el.find('.content').html(el);
    				}
				});
    		} else if(this.options.appId == 3){
    			me.$el.attr('data-appindex','3');
    			
//    			udp.sandbox.subscribe('fileCountUpdate','home-file',function(){
//    				$.ajax({
//	    				url:'files/readCount',
//	    				dataType:'text',
//	    				type:'get',
//	    				success:function(res){
//	    					me.$el.find('.app-title').html(
//	    						'<img src="resources/images/file.png"><div class="content"><ul><li>'+
//	    						'您有<b>' + res + '</b>个文件还未下载'+
//	    						'<span class="label label-important">查看</span></ul></li></div>'
//	    					);
//	    				}
//	    			});
//    			});
    			
    			$.ajax({
    				url:'files/readCount',
    				dataType:'text',
    				type:'get',
    				success:function(res){
    					me.$el.find('.app-logo').html('<img src="resources/img/icon-file.png">');
    					me.$el.find('.app-version').html('版本号：v1.1 2013-03-20 发布');
    					me.$el.find('.content').html(
							'<ul><li>'+'<b>您有' + res + '个文件还未下载</b>'+
							'<span class="entrance">查看</span></li></ul>'
    					);
    				}
    			});
    		} 
	    },
	    
	    viewDetail: function(e){
	    	var target = $(e.target);
	    	var	appindex = target.closest('.udp-app').data('appindex');
	    	
	    	if(appindex == 2){
	    		if(target.data('type') == 'dsp'){
		    		if(target.data('insid') == '0800010000'){
		    			window.location.href = '#!/kpi/dsp/0801020000';
		    		} else {
		    			window.location.href = '#!/kpi/dsp/'+ target.data('insid');
		    		}
	    		} else if(target.data('type') == 'bmi'){
	    			if(target.data('insid') == '0800010000'){
		    			window.location.href = '#!/kpi/fbmi/0800012900';
		    		} else {
		    			window.location.href = '#!/kpi/fbmi/'+ target.data('insid');
		    		}
	    		}
	    	} else if(appindex == 3){
	    		window.location.href = '#!/file/docs/query';
	    	}
	    	
	    	
	    
	    }
	});
	
	return AppView;
});