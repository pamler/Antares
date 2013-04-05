define(function(require, exports, module) {
	"use strict";

	require('bootstrap-tab');
	
	var mainTpl = require('../../html/main.tpl'),
		contentTpl = require('../../html/table.tpl');
	
	var TotalInfo = require('../collection/totalInfos'),
		totalInfo = new TotalInfo;
	
	var sandbox = require('sandbox.kpi.gbmi');
	
	var tableHeaderTpl = [
	    '{@each list as lt}',
	    	'<th colspan="3">@{lt.ruleNm}<br>(@{lt.weight})</th>',
	    '{@/each}'
    ].join('');
	
	var typeMap = {
		"income":"1,3,4",
		"card":"5",
		"tradition":"7,8",
		"innovation":"6",
		"operation":"9"
	};
	
	var MainView = Backbone.View.extend({
		tagName: 'div',
		className: 'row-fluid gbmi',
		template: juicer(contentTpl),
		
	    events: {
	    	"click .nav li a": "tabChange",
	    	"change .tab-pane.active select": "selectMonth",
	    },
	
	    initialize: function() {
	        
	    	if(this.options.indexType != 'operation'){
	    		this.controlTpl = [
	          		'<div class="control-pane">',
	          		'<a class="gbmi-download" name="rank">下载排名数据</a>',
	          		'<a class="gbmi-download" name="detail">下载基础数据</a>',
	          		'<select name="month"></select>',
	          		'</div>'
	          	].join('');
	    	} else {
	    		this.controlTpl = [
		      		'<div class="control-pane">',
		    		'<a class="gbmi-download" name="rank">下载排名数据</a>',
		    		'<select name="month"></select>',
		    		'</div>'
		    	].join('');
	    	} 
	    	
	        this.render();
	    },
	
	    render: function() {
	    	var me = this;
	    	
	    	$.ajax({
	    		type:'get',
	    		dataType:'json',
	    		url:'kpiInfo/tabName/'+typeMap[me.options.indexType],
	    		success:function(res){
	    			var el = juicer(mainTpl,{list:res});
	    			$(me.el).html(el);
	    			me.ruleid = me.$el.find('.nav li.active a').data('ruleid');
	    			
	    			me.renderTablet();
	    		}
	    	});
	    },
	    
	    renderTablet: function(){
	    	var me = this,
	    		nowdate;
	    	
	    	$.ajax({
				type:'get',
	    		dataType:'json',
	    		url:'kpiInfo/getTime',
	    		success:function(res){
	    			me.$el.find('.tab-pane.active').append(
    					me.controlTpl + 
    					'<div class="gbmi-tableCt row-fluid"></div>'
					);
	    			var $select = me.$el.find('.tab-pane.active select');
	    			for(var i = res.length - 1; i >= 0; i--){
	    				if(res[i].objValue == 1){
	    					if(!nowdate){
	    						nowdate = res[i].objName;
	    					}
	    					$select.append('<option value="'+ res[i].objName +'">'+ res[i].objName.substr(4,2)+'月'+'</option>');
	    				}
	    			}
	    			
	    			// 下载排名数据按钮链接修改
	      			var downloadRankUrl = 'kpiInfo/output?url=' + nowdate + 'rule' +
	      				me.ruleid + '.xlsx&type=0&fileNm=' + me.ruleid;
	      			me.$el.find('.tab-pane.active a[name="rank"]').attr('href', downloadRankUrl);
	      			
	      			if(me.options.indexType != 'operation'){
		      			// 下载详细数据按钮链接修改
		      			var downloadDetailUrl = 'kpiInfo/output?url=' + nowdate + me.options.indexType +
		      				'.xlsx&type=1&fileNm=' + me.options.indexType;
		      			me.$el.find('.tab-pane.active a[name="detail"]').attr('href', downloadDetailUrl);
	      			}
	      			
	      			// 表格数据渲染
	      			totalInfo.fetch({
	    	    		url:'kpiInfo/totalInfo/' + nowdate + '/' + me.ruleid,
	    	    		success: function(collection, response, options){
	    	    			var	vlen = collection.models[0].toJSON().vRlist.length;
	        				var el = me.template.render({list:collection.toJSON()});
	        				me.$el.find('.tab-pane.active .gbmi-tableCt').html(el)
	        					.find('.scroll-table-ct .table-header').css({
		        					minWidth: (vlen-1)*211+'px'
		        				});
	        				
	        				me.$el.find('.tab-pane.active .scroll-table-ct .table-body').css({
	        					minWidth: (vlen-1)*211+16+'px'
	        				});
	        				
	        				var frozenTableBody = me.$el.find('.tab-pane.active .frozen-table-ct .table-body'),
							scrollTableHeader = me.$el.find('.tab-pane.active .scroll-table-ct .scroll-header-control'),
							scrollTableBody = me.$el.find('.tab-pane.active .scroll-table-ct .scroll-body-control');
						
							if(scrollTableBody[0].clientHeight < 500){
								scrollTableBody.css('height', 517);
							}
							scrollTableBody.scroll(function(){
								frozenTableBody.scrollTop($(this).scrollTop());
								scrollTableHeader.scrollLeft($(this).scrollLeft());
							});
	    	    		}
	    	    	});
	      			
	      			if(!me.hasInitialized){
	      				sandbox.emit('initialized');
	      				me.hasInitialized = true;
	      			}
	    		}
			});
	    },
	    
	    selectMonth: function(e){
	    	var target = $(e.target),
    			nowdate = target.val(),
    			me = this;
    		
	    	totalInfo.fetch({
	    		url:'kpiInfo/totalInfo/'+ nowdate + '/' + me.ruleid,
	    		success: function(collection, response, options){
	    			var obj = {list:collection.models[0].toJSON().vRlist},
    					headerEl = juicer(tableHeaderTpl, obj),
	    				vlen = collection.models[0].toJSON().vRlist.length;
    				var el = me.template.render({list:collection.toJSON()});
    				me.$el.find('.tab-pane.active .gbmi-tableCt').html(el)
						.find('.scroll-table-ct .table-header').css({
	    					minWidth: (vlen-1)*211+'px'
	    				});
				
					me.$el.find('.tab-pane.active .scroll-table-ct .table-body').css({
						minWidth: (vlen-1)*211+16+'px'
					});
					
					var frozenTableBody = me.$el.find('.tab-pane.active .frozen-table-ct .table-body'),
						scrollTableHeader = me.$el.find('.tab-pane.active .scroll-table-ct .scroll-header-control'),
						scrollTableBody = me.$el.find('.tab-pane.active .scroll-table-ct .scroll-body-control');
					
					if(scrollTableBody[0].clientHeight < 500){
						scrollTableBody.css('height', 517);
					} else {
						scrollTableBody.css('height', 500);
					}
					scrollTableBody.scroll(function(){
						frozenTableBody.scrollTop($(this).scrollTop());
						scrollTableHeader.scrollLeft($(this).scrollLeft());
					});
	    		}
	    	});
  			
  			// 下载排名数据按钮链接修改
  			var downloadRankUrl = 'kpiInfo/output?url=' + nowdate + 'rule' +
  				me.ruleid + '.xlsx&type=0&fileNm=' + me.ruleid;
  			me.$el.find('.tab-pane.active a[name="rank"]').attr('href', downloadRankUrl);
  			
  			if(me.options.indexType != 'operation'){
	  			// 下载详细数据按钮链接修改
	  			var downloadDetailUrl = 'kpiInfo/output?url=' + nowdate + me.options.indexType +
	  				'.xlsx&type=1&fileNm=' + me.options.indexType;
	  			me.$el.find('.tab-pane.active a[name="detail"]').attr('href', downloadDetailUrl);
  			}
	    },
	    
	    tabChange: function(e){
	    	e.preventDefault();
	    	var target = $(e.target),
	    		me = this;
	    	if(!target.closest('li').hasClass('active')){
	    		target.tab('show');
	  			
	  			me.ruleid = target.data('ruleid');
	  			if(!target.data('rendered')){
	  				me.renderTablet();
	  				target.data('rendered',true);
	  			}
  			}
	    }
	});
	
	return MainView;
});