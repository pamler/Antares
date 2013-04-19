define(function(require, exports, module) {
	"use strict";
	
	var Accordions = require('../collection/accordions'),
		accordions = new Accordions;
	
	var sandbox = require('sandbox.menu'),
		perm = require('aura_perm');
	
	var tpl = [
	        '<h3 id=@{divId}-accordion >',
	        	'<div class="icon accordion-@{icon}">@{menuGroupNm}</div>',
	        '</h3>',
	        '<div class="tree-navi" id=@{divId}></div>'
        ].join('');
	
	var MainView = Backbone.View.extend({
		
		template: juicer(tpl),
		events: {
			"click .home-btn": "index",
			"click #accordion h3": "clickAcco"
    	},
		
		initialize: function() {
			this.activeTreeId = '';
			this.ajaxCount = 0;
			
			_.bindAll(this, 'addAll');
		    
		    this.render();
	    },
	    
	    render: function(){
	    	var me = this;
	    	accordions.fetch({
	    		success: me.addAll
	    	});
	    	
	    	return me;
	    },
	    
	    extractURL: function(data){
	    	if(Array.isArray(data)){
	    		for(var i = 0; i < data.length; i++){
	    			this.extractURL(data[i]);
	    		}
	    	} else {
	    		if(data.children && data.children.length != 0){
	    			this.extractURL(data.children);
	    		} else {
	    			perm.addRule(data.data.attr.href.substr(1), data.data.title);
	    		}
	    	}
	    },
	
	    addOne: function(accordion) {
	    	var me = this,
	    		data = accordion.toJSON();
	    	
	    	perm.addApp(data.menuGroupId);
	    	// 通过iframe的方式登陆NIMP
	    	if(data.menuGroupId == 2 && data.menuGroupUrl){
//	    		$('#nimpweb').attr('src',data.protocol+'/nimpweb/gateway/get?appId=A7B20EE1FFA84C740115E645523F743B&targetType=url&targetId=/pages/nimp/dashboard/dashboard.jsf?dashboardid=xykmap');
//	    		udp.nimpProtocol = data.protocol;
	    	}
	    	var element = me.template.render(data);
	        
	    	// html片段生成好就挂载到dom树上，否则后面的tree显示不正确 
	    	me.$el.find('#accordion').append(element);
	        
	        //获取树节点信息，生成tree
	        var url = 'menus?groupId=' + data.menuGroupId;
	        $('#accordion div#' + data.divId).jstree({
		        "plugins" : [ "themes", "json_data", "ui" ],
	        	"json_data" : {
		            "ajax" : {
		                "url" : url,
		                "success": function(data){
			            	me.extractURL(data);
			            	me.ajaxCount--;
			            	if(me.ajaxCount == 0){
			            		// 所有ajax请求完毕
			            		sandbox.emit('initialized');
			            	}
		                	return data;
			            }
		            }
		        },
		         "themes" : {
		            "theme" : "default",
		            "dots" : false,
		            "icons" : true
		        }
    		}).bind("select_node.jstree", function (event, data) { 
    			event.preventDefault();
    			var treeId = data.rslt.obj.closest('.tree-navi').attr('id'),
    				href = data.rslt.obj.find('a').attr('href');
    			if(location.href.match(/#!(\S*)/g) != href){
	    			if(treeId != me.activeTreeId && me.activeTreeId != ''){
	    				me.$el.find('#' + me.activeTreeId).jstree("deselect_all");
	    			}
	    			if(data.rslt.obj.hasClass('jstree-leaf') !== true){
	    				data.rslt.obj.find('ins').first().click();
					}
	    			me.activeTreeId = treeId;
	    			if(href != '#'){
	    				location.href = href;
	    			}
    			}
			});
	    },
	    
	    addAll: function(accordions) {
	    	var me = this;
	    	me.ajaxCount = accordions.length;
	    	
	    	for(var i = 0; i < accordions.length; i++){
	    		me.addOne(accordions.models[i]);
	    	}
	    	me.$el.find('#accordion').accordion({
				collapsible: true,
				icons: false,
				active: false,
				activate: function(e, ui){
					if(ui.newHeader.length){
						me.$el.find('.home-btn').closest('h3').removeClass('ui-state-active');
					}
				}
			});
	        
	        // 设置每个accordion content的高度，以便可以dock在底部
	        var leftViewHeight = $('.left-view').height(),
	        	accordionHeight = leftViewHeight - 130;
	        me.$el.find('.tree-navi').css('height', accordionHeight - accordions.length*40);
	    },
	    
	    index: function(){
	    	$('.home-btn').closest('h3').addClass('ui-state-active');
	    	$('#accordion').accordion({ active: false });
    	    
	    	location.href = '#';
	    },
	    
	    clickAcco: function(){
	    	this.$el.find('.home-btn').closest('h3').removeClass('ui-state-active');
	    }
	});
	
	return MainView;
});
