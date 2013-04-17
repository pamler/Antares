define(function(require, exports, module) {
    "use strict";
    
    require('jqgrid');
    require('jqgrid-locale');
    
    var sandbox = require('sandbox.kpi.fbmi');
    
    var tpl = require('../../html/main.tpl'),
    	titleTpl = require('../../html/title.tpl'),
    	leftTpl = require('../../html/left.tpl'),
    	menuTpl = require('../../html/menu.tpl'),
    	gadgetTpl = require('../../html/gadget.tpl'),
    	kouJingTpl = require('../../html/koujing.tpl'),
    	detailGridTpl = require('../../html/detailGrid.tpl'),
    	subGridTpl = require('../../html/subgrid.tpl'),
    	hiddenRowTpl = require('../../html/hiderow.tpl'),
    	compareGridTpl = require('../../html/compareGrid.tpl');
    
    var ChartView = require('./chart'),
    	GridView = require('./grid');
    
    var FinanceInfo = require('../collection/mainInfos'),
		Subscription = require('../model/subscriptionModel'),
		financeInfo = new FinanceInfo,
		subscription = new Subscription;
    
    var MainView = Backbone.View.extend({

        className: "bmi-page",
        leftTemplate: juicer(leftTpl),
        titleTemplate: juicer(titleTpl),

        events: {
        	"click .bmi-label": "labelChange",
			"click .gadget.enabled": "gadgetClick",
			"click .bmi-calendar": "changeDate",
			"click .view-detail": "viewDetail",
			"click .bmi-subOptionBar span[data-ruleid]": "submenuClick",
			"click .bmi-expand-subgrid": "expandGrid",
			"click .subgrid-icon": "expandSubgrid",
			"click .kj-desc": "viewKjDesc",
			"click a.msg-bind": "bindPhoneMail"
        },
        
        initialize: function() {
        	var me = this;
        	this.nowDate = '20120901';
        	this.pageIndex = 1;
        	this.hasInitialized = false;
        	
        	sandbox.on('bmiRefreshPage', function(date){
				me.nowDate = date;
				me.calendarDialog.close();
				me.dateChanged = true;
				
				// 查看详情表格数据reload
				if(me.detailGrid){
					me.$el.find('.bmi-download-all').attr('href','kpiInfo/output?url='+me.nowDate+'_'+me.options.insIdCd+'detail.xlsx&type=2&fileNm='+me.options.insIdCd);
	        		me.detailGrid.jqGrid('setGridParam', {
	        			url: 'mainPageInfo/downloadDetail/'+ me.options.insIdCd+'/' + me.nowDate
	        		}).trigger('reloadGrid');
        		}
        		
				if(me.pageIndex == 1){
					
					me.barChartLoad(me.ruleid);
		            me.mainGadgetLoad();
		            
				} else if(me.pageIndex == 2){
					
					me.barChartLoad(me.ruleid);
					me.secGadgetLoad(me.ruleid);
				
				} else if(me.pageIndex == 3){
					
					me.digIn(me.ruletp, me.ruleid);
				}
			});
        	
        	sandbox.on('bmiRefreshBinding', function(){
    			me.refreshSubscription();
			});
        	
            this.render();
        },

        render: function() {
            this.$el.html(tpl);
            
            //获取menu信息
			this.mainMenuLoad();
			
    		//获取详细信息
            this.mainGadgetLoad();
            
            //获取chart数据
            this.chart = new ChartView({container: this.$el.find('.chart')});
            this.$el.find('.chart').html(this.chart.el);
            
            return this;
        },
        
        refreshSubscription: function(){
        	var me = this;
        	subscription.fetch({
        		data: $.param({instId: me.options.insIdCd}),
        		success:function(model, response, options){
            		var bind_link = me.$el.find('a.msg-bind'),
            			type = model.get('bmiMobileBinding') + model.get('bmiEmailBinding');
            		
    				if(type == '00'){
    					bind_link.attr('title','您还未绑定短信和邮件通知');
				 	} else if(type == '01'){
				 		bind_link.attr('title','您还未绑定短信通知');
				 	} else if(type == '10'){
				 		bind_link.attr('title','您还未绑定邮件通知');
				 	} else if(type == '11'){
				 		bind_link.attr('title','您已绑定短信和邮件通知');
				 	}
            		
            		if(model.get('bmiMobileBinding') == '0'){
            			me.$el.find('span.bmi-phone').addClass('no-bind');
            		} else {
            			me.$el.find('span.bmi-phone').removeClass('no-bind');
            		}
            		
            		if(model.get('bmiEmailBinding') == '0'){
            			me.$el.find('span.bmi-email').addClass('no-bind');
            		} else {
            			me.$el.find('span.bmi-email').removeClass('no-bind');
            		}
            	}
            });
        },
        
        mainMenuLoad: function(){
			var me = this;
			
        	$.ajax({
        		dataType:'json',
        		type:'get',
        		url:'commonInfo/menu',
        		success:function(res){
        			res.splice(8,1); // 去除考核利润
        			res.splice(9,1); // 去除规范风险管理
        			
        			var el = juicer(menuTpl, {list:res});
            		me.$el.find('.bmi-optionbar').html(el);
            		
            		me.currTarget = me.$el.find('.bmi-label').first().addClass("active");
        		}
        	});
        },
        
        mainGadgetLoad: function(){
        	var me = this;
        	
        	financeInfo.fetch({
        		url:'mainPageInfo/mainDetail/' + me.options.insIdCd + '/' + me.nowDate,
        		success:function(collection, response, options){
        			// 设置当前时间
        			me.nowDate = collection.models[0].toJSON().date;
        			
        			var titleEl = me.titleTemplate.render(collection.models[0].toJSON());
        			me.$el.find('.title').html(titleEl);
        			
        			var leftEl = me.leftTemplate.render(collection.models[0].toJSON());
        			me.$el.find('.general-info .left-info').html(leftEl)
        				.find('a.view-detail').html('查看本月指标明细');
        			var arr = collection.toJSON(),
	        			gadgetGroup, 
	        			gadgetData,
	        			mainPageEl = '',
	        			el;
					for(var i = 0; i < 3; i++){
						gadgetGroup = _.rest(arr).slice(i*4, (i+1)*4);
						gadgetData = {
			    			list: gadgetGroup
			    		};
						el = juicer(gadgetTpl, gadgetData);
						mainPageEl += '<div class="span24 gadget-group"><h3>' +
							['发展大类','效益大类','质量大类'][i] + '</h3>' +
	        				el + '</div><div style="clear:both;"></div>';
					}
	        		me.$el.find('.gadget-container').html(mainPageEl);
	        		me.$el.find('.bmi-maincontent').show();
	        		
	        		//获取chart数据
                	me.barChartLoad(0);
                	
	        		if(!me.hasInitialized){
	        			sandbox.emit('initialized');
	        			me.refreshSubscription();
	        			me.hasInitialized = true;
	        		}
        		}
            });
        },
        
        barChartLoad: function(ruleid){
        	var me = this;
    		me.chart.$el.html('<img class="chart-loader" src="resources/img/chart-loader.gif"/>');

        	if(ruleid == 0){
	        	$.ajax({
	            	url:'mainPageInfo/mainBar/'+me.options.insIdCd+'/'+me.nowDate+'/'+ruleid,
	            	type:'get',
	            	dataType:'json',
	            	success:function(res){
	            		me.chart.redrawBarChart(res);
	            	}
	            });
        	} else {
        		$.ajax({
	            	url:'secPageInfo/secBar/'+me.options.insIdCd+'/'+me.nowDate+'/'+ruleid,
	            	type:'get',
	            	dataType:'json',
	            	success:function(res){
	            		me.chart.redrawBarChart(res);
	            	}
	            });
        	}
        },
        
        secGadgetLoad: function(ruleid){
        	var me = this,
        		tpl = [
    		       '{@each list as lt}',
    		            '{@if lt.readyTp == 0}',
    		       			'<span data-ruletp=@{lt.ruleTp} data-ruleid=@{lt.ruleId}>@{lt.ruleNm}</span>',
    		       		'{@/if}',
    		       '{@/each}'
	            ].join('');
        	
        	financeInfo.fetch({
            	url:'secPageInfo/secDetail/'+me.options.insIdCd+'/'+me.nowDate+'/'+ruleid,
            	success:function(collection, response, options){
            		var arr = collection.toJSON(),
            			ruleNm = arr[0].ruleNm,
			    	    gadgetData = {
			    			list: _.rest(arr)
			    		};
			    	me.$el.find('.bmi-subOptionBar')
			    		.html(juicer(tpl, gadgetData)).slideDown();
			    	
            		var el = juicer(gadgetTpl, gadgetData);
            		if(el){
	            		me.$el.find('.gadget-container').html(
            				'<div class="span24 gadget-group">' + el + '</div>'	
	            		);
            		} else {
            			me.$el.find('.gadget-container').html('');
            		}
            		
            		var leftEl = me.leftTemplate.render(collection.models[0].toJSON());
            		me.$el.find('.general-info .left-info').html(leftEl).find('.belong-type')
    					.html('上级类别：'+ ['发展大类','效益大类','质量大类'][Math.floor((collection.models[0].toJSON().ruleId-1)/4)]);
            		me.$el.find('a.view-detail').html('返回上一级');
            		
            		me.$el.find('.bmi-maincontent').show();
            		
            		//获取chart数据
                	me.barChartLoad(me.ruleid);
            	}
        	});
        },
        
        labelChange: function(e){
        	var me = this,
        		target = $(e.target);
        	
        	me.currTarget.removeClass('active');
        	me.currTarget = target.addClass('active');
        	
        	me.ruletp = target.data('ruletp');
        	me.ruleid = target.data('ruleid');
        	
        	me.$el.find('.bmi-maincontent').hide();
            
            if(target.data('ruleid') != 0){
            	me.pageIndex = 2;
            	me.secGadgetLoad(me.ruleid);
            } else {
            	me.pageIndex = 1;
            	me.$el.find('.bmi-subOptionBar').hide();
            	me.mainGadgetLoad();
            }
        },
        
        gadgetClick: function(e){
        	var target = $(e.currentTarget),
        		me = this;
        	me.$el.find('.bmi-maincontent').hide();
        	
        	if(target.data('ruletp') == 0){
				var labelTarget = me.$el.find('.bmi-label[data-ruleid='+target.data('ruleid')+']');
        		labelTarget.click();
        	} else {
        		this.$el.find('.bmi-subOptionBar span[data-ruleid='+target.data('ruleid')+']').addClass('active');
        		this.digIn(target.data('ruletp'), target.data('ruleid'));
        	}
        },
        
        viewDetail: function(){
        	var me = this;
        	if(this.pageIndex == 1){
        		if(!this.detailGrid){
        			this.detailGrid = new GridView({
        				insIdCd: this.options.insIdCd,
        				nowDate: this.nowDate
        			});
        		}	
	        	art.artDialog({
				    content: this.detailGrid.el,
				    padding: '5px',
				    opacity:'0.2',
				    close: function () {
				        this.hide();
				        return false;
				    }
				}).lock();
	        	
        	} else if(this.pageIndex == 2){
	  			// 返回总体概览
        		var labelTarget = this.$el.find('a.bmi-label[data-ruleid="0"]');
	  			labelTarget.click();
        	} else {
        		// 返回上级指标
        		var labelTarget = this.$el.find('a.bmi-label.active');
	  			labelTarget.click();
        	}
        },
        
        submenuClick: function(e){
        	var target = $(e.target);

        	if(!target.hasClass('active')){
        		this.$el.find('.bmi-maincontent').hide();
        		
        		this.$el.find('.bmi-subOptionBar span[data-ruleid]').removeClass('active');
	        	target.addClass('active');
	        	this.digIn(target.data('ruletp'), target.data('ruleid'));
        	}
        },
        
        digIn: function(ruletp, ruleid){
        	var me = this;
        	me.pageIndex = 3;
        	me.ruletp = ruletp;
        	me.ruleid = ruleid;
        	
        	$.ajax({
            	dataType:'json',
            	type:'get',
        		url:'detailPage/detail/'+me.options.insIdCd+'/'+me.nowDate+'/'+ruleid+'/'+ruletp,
            	success:function(arr){
            		var tmp = {
            			ruleNm: arr[4].objName,
            			scoreValRank: arr[0].objValue,
            			totalPercent: arr[1].objValue,
            			weight: arr[2].objValue,
            			changeInRank: (arr[6].objValue == -999999)?'--':arr[6].objValue,
            		};
        			var leftEl = me.leftTemplate.render(tmp);
            		me.$el.find('.general-info .left-info').html(leftEl).find('.belong-type')
    					.html('上级类别：'+ arr[14].objValue);
            		me.$el.find('a.view-detail').html('返回上一级');
            		
			    	var	gridData_1 = {list: arr.splice(7,5)};
			    	arr.splice(6,4);
			    	var	gridData_2 = {list: arr.slice(3)};
			    	
			    	if(ruletp != 9){
	            		var el_1 = juicer(compareGridTpl, gridData_1),
	            			el_2 = juicer(detailGridTpl, gridData_2);
            		} else {
            			var el_1 = juicer(compareGridTpl, gridData_1),
	            			el_2 = juicer(subGridTpl, gridData_2),
	            			sub_el;
        			
	        			// 获取subgrid data
			        	$.ajax({
			        		type:'get',
			        		dataType:'json',
			        		url:'detailPage/subgridDetail/'+me.options.insIdCd+'/'+me.nowDate+'/'+ruleid,
			        		success:function(res){
			        			// 获取ruleid项
			        			var tmp = [];
			        			for(var i = 0; i < res.length; i++){
			        				tmp[i] = res[i].content.splice(res[i].content.length-1,1);
			        			}
			        			sub_el = juicer(hiddenRowTpl,{responseData:res});
			        			me.$el.find('.gadget-container').find('.row-special').after(sub_el);
			        			me.$el.find('.bmi-subgrid .kj-desc').each(function(index){
			        				$(this).data('ruleid',tmp[index][0].objValue);
			        			});
			        		}
			        	});
            		}
			    	me.$el.find('.gadget-container').html(el_1 + el_2);
			    	me.$el.find('.bmi-maincontent').show();
            	}
        	});
    		
        	//获取chart数据
        	me.chart.$el.html('<img class="chart-loader" src="resources/img/chart-loader.gif"/>');
        	$.ajax({
            	url:'detailPage/line/'+me.options.insIdCd+'/'+me.nowDate+'/'+ruleid,
            	type:'get',
            	dataType:'json',
            	success:function(res){
            		me.chart.redrawLineChart(res);
            	}
            });
        },
        
        changeDate: function(){
        	var view = require('./calendar');
        	
        	// 每次new view是因为dialog关闭会把view的事件抹掉
        	this.calendarDialog = art.artDialog({
			    content: new view({insIdCd:this.options.insIdCd}).el,
			    padding: '5px',
			    opacity:'0.2'
			}).lock();
        },
        
        expandGrid: function(e){
        	var me = this,
        		target = $(e.target),
        		grid = this.$el.find('.bmi-subgrid');
        	
        	if(!grid.is(":visible")){
        		grid.show();
        		grid.find('div').slideToggle();
        	} else {
        		grid.find('div').slideToggle(function(){
        			grid.hide();
        		});
        	}
        },
        
        expandSubgrid: function(e){
        	var target = $(e.target),
        		index = target.data('control');
        	
        	target.css('background-position',function(index, value){
        		if(value == '0px 0px'){
        			return '0px -50px';
        		} else {
        			return '0px 0px';
        		}
        	});
        	target.closest('tr').siblings('[role="'+index+'"]').toggle();
        	
        },
        
        viewKjDesc: function(e){
        	var me = this,
				target = $(e.target);
        	
			if(!me.koujingData){
	    		$.ajax({
	    			dataType:'json',
	    			type:'get',
	    			url:'resources/json/koujing.json',
	    			success:function(res){
	    				art.artDialog({
	    				    content: juicer(kouJingTpl,res['rule']['rule'+(target.data('ruleid')?target.data('ruleid'):me.ruleid)]),
	    				    padding: '5px',
	    				    opacity:'0.2'
	    				}).lock();
	    				me.koujingData = res;
	    			}
	    		});
			} else {
				art.artDialog({
				    title: '公式及口径说明',
				    content: juicer(kouJingTpl,me.koujingData['rule']['rule'+(target.data('ruleid')?target.data('ruleid'):me.ruleid)]),
				    padding: '5px',
				    opacity:'0.2'
				}).lock();
			}
        },
        
        bindPhoneMail: function(){
        	var view = require('./notify'),
			bindView = new view({
				insIdCd:this.options.insIdCd,
				insNm:this.options.insNm,
				nowDate:this.nowDate
			});
    	
	    	// 每次new view是因为dialog关闭会把view的事件抹掉
	    	art.artDialog({
			    content: bindView.el,
			    padding: '5px',
			    opacity:'0.2',
			    ok: function () {
	            	bindView.saveSubscription();
			    },
			    okVal:'确定'
			}).lock();
        }
    });
    
    return MainView;
});