define(function(require, exports, module) {
	"use strict";
	require('bootstrap-dropdown');
	require('jquery-populate');
	
	var sandbox = require('sandbox.kpi.config');
	var configDspTpl = require('../../html/main.tpl');
	
	var Config = require('../model/config'),
		config = new Config;
		
	var instTpl = [
        '{@each data as it, k}',
        	'{@if k == 0}',
        		'<li class="checked"><a href="#" value=@{it.instCode}>@{it.instName} <i class="icon-ok"></i></a></li>',
        	'{@else}',
        		'<li><a href="#" value=@{it.instCode}>@{it.instName} <i class="icon-ok"></i></a></li>',
    		'{@/if}',
        '{@/each}'
    ].join('');
	
	var MainView = Backbone.View.extend({
		
        className: 'dsp-config',
        template: juicer(instTpl),
        instId: '',
        
        events: {
            "click .dropdown-menu li[class!='checked'] a": "instSelect",
            "click .submit": "submitForm",
            "click .restore": "restoreForm",
            "click input[type='checkbox']": "select"
        },
        
	    initialize: function() {
	      
	        this.render();
	    },
	    
	    render: function(){
	    	var me = this;
	    	me.$el.html(configDspTpl);
	    	me.$el.find('.dropdown-toggle').dropdown();
	    	
	    	me.$el.find('.table thead tr th:last-child').addClass('last-item');
	    	me.$el.find('.table tbody tr:last-child,.table tbody tr td:last-child').addClass('last-item');
	    	
	    	//总体checkbox隐藏
	    	$.ajax({
	    		url:'resources/json/inst18.json',
	    		type:'get',
	    		dataType:'json',
	    		success:function(res){
	    			var element = me.template.render(res);
	    			$(me.el).find('.dropdown-menu').html(element);
	    			
	    			me.instId = res.data[0].instCode;
	    			me.$el.find('form header h3').text(res.data[0].instName);
	    			
					//默认加载第一个机构的配置
	    			config.set({
	    				ins_id: res.data[0].instCode
	    			});
	    			config.fetch({
			    		success:function(model, response, options){
			    			var obj = {};
			    			if(response.pageList&&response.pageList.length!=0){
				    			for(var i=0; i<response.pageList.length; i++){
				    				obj[response.pageList[i].pageId] = response.pageList[i].paraList;
				    			}
				    			me.$el.find('form').populate(obj);
			    			} else {
			    				me.$el.find('input').each(function(){
			    					this.checked = false;
			    				});
			    			}
			    			
			    			// 应用加载完毕
			    			
			    			sandbox.emit('initialized');
			    		}
			    	});
	    		}
	    	});
	    	
	    },
	    
	    instSelect: function(e){
	    	e.preventDefault();
	    	
	    	var me = this,
	    		target = $(e.target);
	    	
	    	this.instId = target.attr('value');
	    	var instNm = target.text();
	    	config.set({
				ins_id: this.instId
			});
	    	config.fetch({
	    		success:function(model, response, options){
	    			var obj = {};
	    			if(response.pageList&&response.pageList.length!=0){
		    			for(var i=0; i<response.pageList.length; i++){
		    				obj[response.pageList[i].pageId] = response.pageList[i].paraList;
		    			}
		    			me.$el.find('form').populate(obj);
		    			me.$el.find('form header h3').text(instNm);
		    			
		    			me.$el.find('.dropdown-menu li[class="checked"]').removeClass('checked');
		    			target.closest('li').addClass('checked');
	    			} else {
	    				me.$el.find('input').each(function(){
	    					this.checked = false;
	    				});
	    			}
	    		}
	    	});
	    },
	    
	    select: function(e){
	    	var target = $(e.target);
	    	
	    	if(target.hasClass('select-all')){
		    	if(target.attr('checked')){
		    		target.closest('td').siblings().find('input').attr('checked', true);
		    	} else {
		    		target.closest('td').siblings().find('input').attr('checked', false);
		    	}
	    	} else {
	    		if(target.attr('checked')){
	    			var arr = target.closest('tr').find('td input'),
	    				flag = true;
	    			for(var i = 0; i < arr.length; i++){
	    				if(i != arr.length - 1){
	    					flag = $(arr[i]).attr('checked') && flag;
	    				} else {
	    					$(arr[i]).attr('checked', flag);
	    				}
	    			}
	    		} else {
	    			target.closest('tr').find('td:last-child input').attr('checked', false);
	    		}
	    	}
	    },
	    
	    restoreForm: function(){
	    	var me = this;
	    	
	    	config.fetch({
	    		success:function(model, response, options){
	    			var obj = {};
	    			if(response.pageList&&response.pageList.length!=0){
		    			for(var i=0; i<response.pageList.length; i++){
		    				obj[response.pageList[i].pageId] = response.pageList[i].paraList;
		    			}
		    			me.$el.find('form').populate(obj);
	    			} else {
	    				me.$el.find('input').each(function(){
	    					this.checked = false;
	    				});
	    			}
	    		}
	    	});
	    },
	    
	    submitForm: function(e){
	    	e.preventDefault();
	    	
            var str = this.$el.find('form').serialize(),
            	query = {};
            str.replace(/\b([^&=]*)=([^&=]*)/g, function(m, a, d) {
                a = a.replace(/%5B/g, '[').replace(/%5D/g, ']');
                if (typeof query[a] != 'undefined') {
                    query[a].push(decodeURIComponent(d));
                } else {
                    query[a] = [];
                    query[a].push(decodeURIComponent(d));
                }
            });
            var newParam = [];
            for(var key in query){
            	newParam.push({
            		pageId: key.substr(0,key.length-2),
            		paraList: query[key]
            	})
            }
            
            var configModel = new Config;
            configModel.save({
            	ins_id: this.instId,
            	pageList: newParam
            },{
            	success:function(model, response, options){
            		if(response.value == 'true'){
            			var dialog = art.artDialog({
						    content: '配置成功！',
						    icon: 'succeed',
						    opacity: 0.1
			        	}).lock();
            		} 
            	}
            });
            configModel = null;
	    }
	    
	});
	
	return MainView;
});