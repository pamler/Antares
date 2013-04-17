define(function(require, exports, module) {
    "use strict";
    
    var tpl = require('../../html/mchntdialog.tpl'),
    	tableTpl = require('../../html/mchnt-table.tpl');
    
    var ChartView = require('./chart');
    
    var MchntPopView = Backbone.View.extend({
    	className:'mchntpop',
        events: {
        	"change [name='mchntRadios']": "changeRadio"
    	},
    	
    	initialize: function(){
    		
    		this.render();
    	},
        
        render: function() {
            var me = this;
            this.$el.html(tpl);
            
            var info = this.$el.find('.mchnt-title p span');
            $(info[0]).html(this.options.mchntId);
            $(info[1]).html(this.options.mchntNm);
            
            // 渲染图形
            me.chart = new ChartView({container: me.$el.find('.mchnt-chart')});
            me.$el.find('.mchnt-chart').html(me.chart.el);
            me.chart.$el.html('<img class="chart-loader" src="resources/img/chart-loader.gif"/>');
            $.ajax({
            	url:'market/testColumn/3',
            	type:'get',
            	dataType:'json',
            	success:function(res){
            		me.chart.redrawColumnChart(res, me.options.mchntId, true);
            	}
            });
            
            // 渲染表格
            $.ajax({
            	url:'market/mchntDetail/1',
            	type:'get',
            	dataType:'json',
            	success:function(res){
            		me.$el.find('.mchnt-table').html(juicer(tableTpl, {list:res}));
            	}
            });
            return this;
        },
        
        changeRadio: function(e){
        	var target = $(e.target);
        	if(target.val() == 'table'){
        		this.$el.find('.mchnt-table').show();
        		this.$el.find('.mchnt-chart').hide();
        	} else if(target.val() == 'chart'){
        		this.$el.find('.mchnt-table').hide();
        		this.$el.find('.mchnt-chart').show();
        	}
        }

    });
    
    return MchntPopView;
});