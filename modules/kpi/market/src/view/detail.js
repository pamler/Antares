define(function(require, exports, module) {
    "use strict";
    
    require('jqgrid');
    require('jqgrid-locale');
    
    var tpl = require('../../html/detail.tpl');
    var ChartView = require('./chart');
    
    var Mchnts = require("../collection/mchnts");
    
    var DetailView = Backbone.View.extend({

        className: "detail-page",

        events: {
        	"click .mchnt-detail": "showMchntDetail",
        	"click .toback": "backToMain"
        },
        
        initialize: function() {
        	_.bindAll(this, 'fillMchntInfo', 'selectRow');
        	this.curMchntId = '';
        	this.curMchntNm = '';
        	
        	this.mchnts = new Mchnts();
            this.render();
        },

        render: function() {
            this.$el.html(tpl);
            
            var title = this.$el.find('.widget-header h3').text();
            this.$el.find('.widget-header h3').text(this.options.instNm + title);
            
            return this;
        },
        
        refresh: function(instId){
        	this.mchntGrid.jqGrid('setGridParam', {
                url: 'market/mchnt200/0800012900'
            }).trigger("reloadGrid", [{
                page: 1
            }]);
        },
        
        renderGrid: function(){
        	var me = this;
        	this.mchntGrid = this.$el.find("#kpi-market-list").jqGrid({
 				datatype: "json",
 				url: 'market/mchnt200/0800012900',
			   	colNames:['填写标示','商户编码','商户名称', 'MCC','交易量分流率','细分行业类型','交易金额(万元)',
			   	          '同比增长','同比增长平均水平','注册地址','受理机构代码','受理机构名称','注册时间','注册更新时间'],
			   	colModel:[
			   		{name:'ifInput',index:'insIdCd', width:100, align:"center"},
			   		{name:'mchntId',index:'mchntId', width:110, align:"center"},		
			   		{name:'mchntNm',index:'mchntNm', width:100, align:"center"},
			   		{name:'mcc',index:'mcc', width:70, align:"center"},
			   		{name:'flrate',index:'flrate', width:100, align:"center"},
			   		{name:'mccDetail',index:'mccDetail', width:100, align:"center"},
			   		{name:'amount',index:'amount', width:100, align:"center"},
			   		{name:'tbRate',index:'tbRate', width:100, align:"center"},
			   		{name:'tbAvgRate',index:'tbAvgRate', width:110, align:"center"},
			   		{name:'address',index:'address', width:100, align:"center"},
			   		{name:'acqInstId',index:'acqInstId', width:100, align:"center"},
			   		{name:'acqInstNm',index:'acqInstNm', width:100, align:"center"},
			   		{name:'regDate',index:'regDate', width:100, align:"center"},
			   		{name:'regNewDate',index:'regNewDate', width:100, align:"center"},
			   	],
 			   	rowNum:15,
 			   	rownumbers:true,
 			    scroll: true,
 			   	height:300,
 			   	autowidth:true,
 			   	shrinkToFit: false,
 			   	hidegrid: false,
 			    viewrecords: true,
 			    jsonReader : {  
 			       root:"data",   
 			       repeatitems: false,
 			       id: "1" 
 			    },
 			    loadComplete: function(res) {
                   me.mchnts.reset(res.data);
                   var ids = $("#kpi-market-list").getDataIDs(); 
                   if (ids.length > 0) { 
                	   $("#kpi-market-list").jqGrid('setSelection', "" + ids[0]);
                   } 
                },
 			    onSelectRow: this.selectRow
 			});
        },
        
        selectRow: function(rowid, status, e){
        	var curMchntId = this.mchntGrid.jqGrid('getRowData', rowid)['mchntId'];
            var mchnt = this.mchnts.get(curMchntId);
            this.fillMchntInfo(mchnt);
            
            this.curMchntId = mchnt.get('mchntId');
            this.curMchntNm = mchnt.get('mchntNm');
        },
        
        fillMchntInfo: function(model){
        	this.$el.find('[name="mchntId"] span').html(model.get('mchntId'));
        	this.$el.find('[name="mchntNm"] span').html(model.get('mchntNm'));
        	this.$el.find('[name="mcc"] span').html(model.get('mcc')+' / '+model.get('mccDetail'));
        	this.$el.find('[name="flrate"] span').html(model.get('flrate'));
        	this.$el.find('[name="address"] span').html(model.get('address'));
        	this.$el.find('[name="acqInstId"] span').html(model.get('acqInstId')+' / '+model.get('acqInstNm'));
        	this.$el.find('[name="regDate"] span').html(model.get('regDate')+' / '+model.get('regNewDate'));
        	this.$el.find('[name="flReason"]').html(model.get('flReason'));
        	this.$el.find('[name="flMeasure"]').html(model.get('flMeasure'));
        	this.$el.find('[name="ifFenliu"][value='+model.get('ifFenliu')+']').attr("checked",true);
        	
        	// 渲染table
        	var tableTpl = [
                '<tr><th></th><th>2012.06</th><th>2012.05</th><th>2012.04</th></tr>',
                '<tr><td>交易金额(万元)</td><td>@{amount}</td><td>@{amount_1}</td><td>@{amount_2}</td></tr>',
                '<tr><td>同比增长</td><td>@{tbRate}</td><td>@{tbRate_1}</td><td>@{tbRate_2}</td></tr>',
                '<tr><td>同比增长平均水平</td><td>@{tbAvgRate}</td><td>@{tbAvgRate_1}</td><td>@{tbAvgRate_2}</td></tr>'
            ].join('');
        	
        	var el = juicer(tableTpl, model.toJSON());
        	this.$el.find('.mchnt-table table').html(el);
        },
        
        backToMain: function(){
        	this.$el.hide();
        	this.$el.siblings('.main-page').show();
        },
        
        showMchntDetail: function(){
        	var view = require('./mchntPop');

        	// 每次new view是因为dialog关闭会把view的事件抹掉
        	art.artDialog({
			    content: new view({
			    	mchntId:this.curMchntId,
			    	mchntNm:this.curMchntNm
		    	}).el,
			    padding: '5px',
			    opacity:'0.2'
			}).lock();
        }
        
    });
    
    return DetailView;
});