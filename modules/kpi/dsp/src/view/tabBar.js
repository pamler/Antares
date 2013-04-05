define(function(require, exports, module) {
    "use strict";
    
    var TabBar = require('../collection/tabBar');
    var tpl = require('../../html/tabbar-content.tpl'),
    	tplHead = require('../../html/tabbar-head.tpl');
    
    var TabBarView = Backbone.View.extend({
        tagName: "div",
        className: "tabbable",
        
        template: juicer(tpl),
        templateHead: juicer(tplHead),
        
        buttons:['总体','借记卡','信用卡','交易金额','交易笔数','活卡量'],
        pages:['跨行概览','卡品牌','受理地','渠道','商户结构','交易质量','高端卡',
        	'公务卡','IC卡','跨行概览-受理','受理地-受理','活动终端-受理','商户结构-受理'],
        optionMap:{
        	"04":"iss",
        	"03":"acq",
        	"01$02$03$04":"1",
        	"01$04":"2",
        	"02$03":"3",
        	"004":"4",
        	"005":"5",
        	"006":"6"
        },
        
        events: {
            "click ul.nav li a": "tabChange"
        },
        
        initialize: function() {
            this.tabCounter = 0;
        	this.currentPage = '';
        	
        	//tab 头
            this.tabHead = $("<ul>", {
                "class": "nav nav-tabs"
            });
            //tab 内容
            this.tabContent = $("<div>", {
                "class": "tab-content"
            });
            
            var slider = $('<div class="slider" style="width:110px;"></div>');
            this.$el.append(this.tabHead);
            this.$el.append(slider);
            this.$el.append(this.tabContent);

            this.collection = new TabBar;
            _.bindAll(this, 'addOne', 'tabChange');
            this.collection.bind('add', this.addOne);
            this.collection.add(this.options.tabCollection);

        },
        
        addOne: function(tab) {
        	var me = this;
            if (this.tabCounter === 0) {  //第一个tab默认active
                tab.set("first",true);
                //渲染按钮
                var pageId = tab.get('pageId'),
            		paraList = this.collection.get(pageId).get('paraList');
            	
        		this.currentPage = this.pages[pageId.substr(4)-1];
            	
            	this.options.parent.$el.find('[data-category="DBT-CRDT"]').html('');
            	this.options.parent.$el.find('[data-category="CNNUM-AT-ACT"]').html('');
            	_.each(paraList, function(value){
        			var el = '<button type="button" class="btn" data-option='+
        				value+'>'+me.buttons[value-1]+'</button>';
        			if(value <= 3){
        				me.options.parent.$el.find('[data-category="DBT-CRDT"]').append(el);
        			} else {
        				me.options.parent.$el.find('[data-category="CNNUM-AT-ACT"]').append(el);
        			}
            	});
            	
            	$(this.options.parent.$el.find('[data-category="DBT-CRDT"]').find('button')[0]).click();
            	$(this.options.parent.$el.find('[data-category="CNNUM-AT-ACT"]').find('button')[0]).click();
            }

            tab.set("tabCounter",this.tabCounter++);
		    tab.set("insIdCd",this.options.insIdCd);
		    
            this.tabHead.append(this.templateHead.render(tab.toJSON()));
            this.tabContent.append(this.template.render(tab.toJSON()));
        },
        
        refreshBar: function(pageList){
        	this.tabHead.html('');
        	this.tabContent.html('');
        	this.tabCounter = 0;
        	
        	//清空参数对象，重新赋值
        	delete this.options.parent.allOptions['DBT-CRDT'];
        	delete this.options.parent.allOptions['CNNUM-AT-ACT'];
        	this.collection.reset();
        	
        	if(pageList.length == 0){
        		pageList.push({});
        	}
        	this.collection.add(pageList);
        	
        	$(this.el).find('.slider').animate({left: 0},'normal');
        	
        	return this;
        },
        
        tabChange: function(e) {
        	e.preventDefault();
        	var me = this,
        		target = $(e.target),
    			slider = $(this.el).find('.slider');
  			slider.animate({
  				left: target.position().left - 5
  			},"normal",function(){
  				if(!target.closest('li').hasClass('active')){
	            	target.tab('show');
	            	
	            	var pageId = target.data('category'),
	            		paraList = me.collection.get(pageId).get('paraList');
	            	
	            	me.currentPage = me.pages[pageId.substr(4)-1];
	            	
	            	//渲染按钮
	            	me.options.parent.$el.find('[data-category="DBT-CRDT"]').html('');
	            	me.options.parent.$el.find('[data-category="CNNUM-AT-ACT"]').html('');
	            	_.each(paraList, function(value){
	        			var el = '<button type="button" class="btn" data-option='+
	        				value+'>'+me.buttons[value-1]+'</button>';
	        			if(value <= 3){
	        				me.options.parent.$el.find('[data-category="DBT-CRDT"]').append(el);
	        			} else {
	        				me.options.parent.$el.find('[data-category="CNNUM-AT-ACT"]').append(el);
	        			}
	            	});
	            	//按钮选中
	            	var buttonItem1 = me.optionMap[me.options.parent.allOptions['DBT-CRDT']],
	            		buttonItem2 = me.optionMap[me.options.parent.allOptions['CNNUM-AT-ACT']],
	            		selector1 = '[data-option='+buttonItem1+']',
	            		selector2 = '[data-option='+buttonItem2+']';
	            	
	            	//清空参数对象，重新赋值
	            	delete me.options.parent.allOptions['DBT-CRDT'];
	            	delete me.options.parent.allOptions['CNNUM-AT-ACT'];
	            		
	            	if($.inArray(buttonItem1, paraList) != '-1'){
	            		 me.options.parent.$el.find(selector1).click();
	            	} else {
	            		$(me.options.parent.$el.find('[data-category="DBT-CRDT"]').find('button')[0]).click();
	            	}
	            	
	            	if($.inArray(buttonItem2, paraList) != '-1'){
	            		 me.options.parent.$el.find(selector2).click();
	            	} else {
	            		$(me.options.parent.$el.find('[data-category="CNNUM-AT-ACT"]').find('button')[0]).click();
	            	}
	            	
	            	//页面的选项全部默认选中第一个
	            	var radioGroup = me.$el.find('.tab-pane.active').find('.tab-bar-options input');
	            	if(radioGroup.length != 0){
	            		$(radioGroup[0]).click();
	            	}
	            	//渲染图形
		            me.options.parent.renderChart();
	            }
  			});
            
        }

    });
    return TabBarView;
});