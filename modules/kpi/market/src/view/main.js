define(function(require, exports, module) {
    "use strict";
    
    var sandbox = require('sandbox.kpi.market');
    
    var tpl = require('../../html/main.tpl');
    var ChartView = require('./chart'),
    	DetailView = require('./detail');
    
    var MainView = Backbone.View.extend({

        className: "market-page",

        events: {
        	"click .detail": "showDetailPage"
        },
        
        initialize: function() {
        	
            this.render();
        },

        render: function() {
            this.$el.html(tpl);
            
            var instId = '', me = this;
            if(this.options.instId == 'general'){
            	instId = this.options.instId  = '0800012900';
            } else {
            	instId = this.options.instId;
            }
            
            // 标题修改
            this.$el.find('.trend h3').html(this.options.branch[instId] + '近6月分流率趋势');
            this.$el.find('.download h3').html(this.options.branch[instId] + '报表下载');
            this.$el.find('.report-item').each(function(){
            	$(this).text(me.options.branch[instId] + $(this).text());
            });
            
            //获取chart数据
        	this.mainChartLoad(instId);
            
            return this;
        },
        
        mainChartLoad: function(instId){
        	var me = this;
    		me.chart1 = new ChartView({container: me.$el.find('.g-chart')});
            me.$el.find('.g-chart').html(me.chart1.el);
            me.chart1.$el.html('<img class="chart-loader" src="resources/img/chart-loader.gif"/>');
            
            me.chart2 = new ChartView({container: me.$el.find('.b-chart')});
            me.$el.find('.b-chart').html(me.chart2.el);
            me.chart2.$el.html('<img class="chart-loader" src="resources/img/chart-loader.gif"/>');
        	
            // 36家分公司图形
            $.ajax({
            	url:'market/testColumn/1',
            	type:'get',
            	dataType:'json',
            	success:function(res){
            		me.chart1.redrawColumnChart(res, instId);
            	}
            });
           
            // 近6月分公司图形
            $.ajax({
            	url:'market/testColumn/2',
            	type:'get',
            	dataType:'json',
            	success:function(res){
            		me.chart2.redrawColumnChart(res, instId);
            	}
            });
        },
        
        showDetailPage: function(){
        	var me = this;
        	this.$el.find('.main-page').hide();
        	
        	if(!this.detailPage){
        		this.detailPage = new DetailView({
        			instId:me.options.instId, 
        			instNm:me.options.branch[me.options.instId]
        		});
        		this.$el.append(this.detailPage.el);
        		this.detailPage.renderGrid();
        	} else {
        		this.detailPage.refresh(this.options.instId);
        		this.$el.find('.detail-page').show();
        	}
        	
        }
        
    });
    
    return MainView;
});