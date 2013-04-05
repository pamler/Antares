define(function(require, exports, module) {
    "use strict";
    
    require('bootstrap-button');
    require('bootstrap-tab');
    
    var sandbox = require('sandbox.kpi.dsp');
    
    var tpl = require('../../html/main.tpl'),
    	titleTpl = require('../../html/title.tpl');
//    
    var TabBarView = require('../view/tabBar');
//    	ChinaMapView = require('../view/chinaMapView');
    var DspInfo = require('../model/infoModel'),
    	DspParam = require('../model/paramModel');
    	
    var MainView = Backbone.View.extend({

        className: "dsp-page",
        titleTemplate: juicer(titleTpl),
        optionMap: {
        	"iss":"04",          //发卡
        	"acq":"03",          //受理
        	"1":"01$02$03$04",   //总体
        	"2":"01$04",         //借记卡
        	"3":"02$03",         //信用卡
        	"4":"004",           //交易金额
        	"5":"005",           //交易笔数
        	"6":"006"            //活卡量
        },

        events: {
            "click .dsp-optionbar .btn-group button": "optionChange"
//            "click .submit": "submit",
//            "change .dsp-optionbar select ": "dateChange",
//            "click .tab-bar-options input": "radioChange"
        },
        
        initialize: function() {
	        this.allOptions = {};
	        this.mType = '';
//	        this.nimpPageId = '';
        	_.bindAll(this, 'renderTitle');
            
            this.render();
        },

        render: function() {
			var me = this;
            me.$el.html(tpl);
            
            var dspInfo = new DspInfo;
            dspInfo.fetch({
            	url:'kpiInfo/mainInfo?insId=' + me.options.insIdCd,
            	success: me.renderTitle
            });	
            
            return this;
        },
        
        renderTitle: function(model){
        	var me = this;
        	
        	var year = model.get('nowDate').substr(0,4),
				month = model.get('nowDate').substr(4,2);
			me.$el.find('[name="year"]').val(year);
			me.$el.find('[name="month"]').val(month);
				
			var el = me.titleTemplate.render(model.formatData().toJSON());
			me.$el.find('.title').html(el);
			
			me.renderParam();
        },
        
        renderParam: function(){
        	var me = this,
        		dspParam = new DspParam;
        	
        	dspParam.fetch({
            	url:'dspPri/p2p/query?revId='+me.options.insIdCd,
            	success:function(model, response, options){
            		if(response.businessType == 'both'){
            			me.mType = me.allOptions['ISS-ACQ'] = '04';
            			var el = '<button type="button" class="btn active" data-option="iss">发卡</button>' + 
            				'<button type="button" class="btn" data-option="acq">受理</button>';
            			me.$el.find('[data-category="ISS-ACQ"]').html(el);
            		} else if(response.businessType == 'iss'){
            			me.mType = me.allOptions['ISS-ACQ'] = '04'; 
            			var el = '<button type="button" class="btn active" data-option="iss">发卡</button>';
            			me.$el.find('[data-category="ISS-ACQ"]').html(el);
            		} else if(response.businessType == 'acq'){
            			me.mType = me.allOptions['ISS-ACQ'] = '03'; 
            			var el = '<button type="button" class="btn active" data-option="acq">受理</button>';
            			me.$el.find('[data-category="ISS-ACQ"]').html(el);
            		}
            		me.renderTabBar(response.pageList);
            	}
			});
        },
        
        renderTabBar: function(pageList) {
			if(!this.tabBarView){
	            this.tabBarView = new TabBarView({
	                insIdCd: this.options.insIdCd,
	                tabCollection: pageList,
	                parent: this
	            });
	            this.$el.find(".tabbar").empty().append(this.tabBarView.el);
	            
	            // 判断dsp应用加载完毕
	            sandbox.emit('initialized');
            } else {
            	this.tabBarView.refreshBar(pageList);
            }
            
            this.renderChart();
        },
        
        optionChange: function(e) {
        	var me = this;
            var target = $(e.target),
            	cat = target.parent().data("category"),
            	option = target.data('option');
            
            this.allOptions[cat] = this.optionMap[option];
            
            if(!target.hasClass('active')&&target.siblings().hasClass('active')){
                if(!me.timer){
                	me.$el.find('.pointer-hand').show();
	                me.timer = setInterval(function(){
		            	me.$el.find('.pointer-hand').fadeOut(800).fadeIn(800).fadeOut(800);
		            },2400);
	            }
            }
            
            target.btButton('toggle');	
        },
        
        dateChange: function(e) {
        	var me = this;
            if(!me.timer){
            	me.$el.find('.pointer-hand').show();
                me.timer = setInterval(function(){
	            	me.$el.find('.pointer-hand').fadeOut(800).fadeIn(800).fadeOut(800);
	            },2400);
            }
        },

        submit: function() {
        	
        	var me = this;
        	if(me.timer){
        		clearInterval(me.timer);
        		me.timer='';
        	}
        	me.$el.find('.pointer-hand').hide();
        	//首先检查发卡、受理按钮有没有改变，若改变，则重新渲染参数
        	if(me.allOptions["ISS-ACQ"] != me.mType){
        		var type = '';
        		if(me.allOptions["ISS-ACQ"] == '04'){
        			type = 'iss';
        		} else if(me.allOptions["ISS-ACQ"] == '03'){
        			type = 'acq';
        		}
        		
        		dspParam.fetch({
	            	url:'dspPri/p2p/' + type + '?revId=' + me.options.insIdCd,
	            	success:function(model, response, options){
	            		me.renderTabBar(response.pageList);
	            	}
	            });
	            me.mType = me.allOptions["ISS-ACQ"];
        		
        	} else {
        		
        		if(me.$el.find('.tab-pane.active .tab-bar-options input').length > 0 ){
        			me.$el.find('.tab-pane.active .tab-bar-options input').each(function(){
        				if(this.checked == true){
        					this.checked = '';
        					$(this).click();
        					return false;
        				}
        			});
        		} else {
    				me.renderChart();
    			}
        	}
        },
        
        radioChange: function(e){
        	
        	var target = $(e.target),
        		val = target.val();
//        		url = udp.nimpProtocol + '/nimpweb/pages/nimp/dashboard/dashboard.jsf?dashboardid=';
        	
        	if(this.timer){
        		clearInterval(this.timer);
        		this.timer='';
        	}
        	this.$el.find('.pointer-hand').hide();	
        	
    		var queryStr = '&InsCd=' + this.options.insIdCd + 
    			'&date=' + this.$el.find('[name="year"] option:selected').val() + this.$el.find('[name="month"] option:selected').val() + '01';
        	for(var key in this.allOptions){
            	queryStr += ('&'+key + '=' + this.allOptions[key]);
            }
            
        	switch(val){
        		case 'g' : 
        			this.nimpPageId = '818000';
        			break;
    			case 'atm-pie' :
    				this.nimpPageId = '818100';
        			break;
        		case 'atm-line' :
    				this.nimpPageId = '818101';
        			break;
    			case 'pos-line' :
    				this.nimpPageId = '818201';
        			break;
        		case 'sh-pie' :
        			this.nimpPageId = '815000';
        			break;
        		case 'sh-line' :
        			this.nimpPageId = '815001';
        			break;
        		case 'kj' :
        			queryStr += '&CNCRAD_NUM_AVG=1';
        			break;
        		case 'bj' :
        			queryStr += '&CNCRAD_NUM_AVG=2';
        			break;
        		case 'gd-pie' :
        			this.nimpPageId = '813000';
        			break;
        		case 'gd-line' :
        			this.nimpPageId = '813001';
        			break;
        		case 'gw-pie' :
        			this.nimpPageId = '814000';
        			break;
        		case 'gw-line' :
        			this.nimpPageId = '814001';
        			break;
        		case 'ic-line' :
        			this.nimpPageId = '817001';
        			break;
        		case 'mchnt' :
        			this.nimpPageId = '817000';
        			queryStr += '&MCHNT-TOUCH-APP=1';
        			break;
    			case 'touch' :
        			this.nimpPageId = '817000';
        			queryStr += '&MCHNT-TOUCH-APP=2';
        			break;
    			case 'ap' :
        			this.nimpPageId = '817000';
        			queryStr += '&MCHNT-TOUCH-APP=3';
        			break;
        		default: 
        			break;
        	}
        	
        	var newURL = url + this.nimpPageId + queryStr + '&appId=A7B20EE1FFA84C740115E645523F743B&dbinstid=' + 
        		this.nimpPageId + this.options.insIdCd; 
            this.$el.find('.dsp-maincontent > iframe').attr('src',newURL);
        },
        
        renderChart: function() {
        	if(this.timer){
        		clearInterval(this.timer);
        		this.timer='';
        	}
        	this.$el.find('.pointer-hand').hide();
        	if(this.tabBarView.currentPage == '受理地' || this.tabBarView.currentPage == '受理地-受理'){
            	this.$el.find('.dsp-maincontent > iframe').hide();
            	
            	if(!this.chinaMap){
            		this.chinaMap = new ChinaMapView();
            		this.$el.find('.dsp-map').show().append(this.chinaMap.el);
            		this.chinaMap.renderMap().refreshData({
            			ins_id:this.options.insIdCd,
            			date:this.$el.find('[name="year"] option:selected').val() + this.$el.find('[name="month"] option:selected').val() + '01',
            			card_attr:this.allOptions['DBT-CRDT'],
            			page:this.tabBarView.currentPage
            		});
            	} else {
					this.$el.find('.dsp-maincontent .dsp-map').show();
					this.chinaMap.refreshData({
						ins_id:this.options.insIdCd,
            			date:this.$el.find('[name="year"] option:selected').val() + this.$el.find('[name="month"] option:selected').val() + '01',
            			card_attr:this.allOptions['DBT-CRDT'],
            			page:this.tabBarView.currentPage
					});
            	}
            } else {
            	this.$el.find('.dsp-maincontent > iframe').show();
            	this.$el.find('.dsp-maincontent .dsp-map').hide();
            	
            	var queryStr = '&InsCd=' + this.options.insIdCd + 
    				'&date=' + this.$el.find('[name="year"] option:selected').val() + this.$el.find('[name="month"] option:selected').val() + '01';
	            for(var key in this.allOptions){
	            	queryStr += ('&'+key + '=' + this.allOptions[key]);
	            }
	            
	            this.nimpPageId = '';
	            switch(this.tabBarView.currentPage){
	            	case '跨行概览':
	            		this.nimpPageId = '812001';
	            		break;
	            	case '卡品牌':
	            		this.nimpPageId = '811000';
	            		break;
            		case '渠道':
	            		this.nimpPageId = '818000';
	            		break;
            		case '商户结构':
	            		this.nimpPageId = '815000';
	            		break;
            		case '交易质量':
	            		this.nimpPageId = '816000';
	            		break;
            		case '高端卡':
	            		this.nimpPageId = '813000';
	            		break;
            		case '公务卡':
	            		this.nimpPageId = '814000';
	            		break;
            		case 'IC卡':
	            		this.nimpPageId = '817001';
	            		break;
	            	case '跨行概览-受理':
	            		this.nimpPageId = '812001';
	            		break;
	            	case '活动终端-受理':
	            		this.nimpPageId = '801000';
	            		break;
	            	case '商户结构-受理':
	            		this.nimpPageId = '802000';
	            		break;
	            	default: break;
	            }
	            
	            if(this.nimpPageId != ''){
		            this.$el.find('.slider').show();
		            this.$el.find('.dsp-maincontent > iframe').attr('src',
//		            	udp.nimpProtocol + '/nimpweb/pages/nimp/dashboard/dashboard.jsf?dashboardid=' + this.nimpPageId + queryStr + '&appId=A7B20EE1FFA84C740115E645523F743B&dbinstid=' + 
	    				this.nimpPageId + this.options.insIdCd);
				} else {
					this.$el.find('.dsp-maincontent > iframe').hide();
					this.$el.find('.slider').hide();
				}
            }
        }


    });
    return MainView;
});