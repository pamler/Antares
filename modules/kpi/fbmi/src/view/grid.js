define(function(require, exports, module) {
	"use strict";
	
	var tpl = [
	    '<a class="btn btn-small btn-primary"><i class="icon-download-alt icon-white"></i> 下载报表</a>',
	    '<div class="udp-grid"><table id="bmi-detail-grid"></table></div>'
    ].join('');
	
	var gridView = Backbone.View.extend({
		
	    events: {
	    	
	    },
	
	    initialize: function() {
	        
	        this.$el.html(tpl);
	        
	        this.render();
	    },
	
	    render: function() {
	    	
	    	var grid = this.$el.find('table');
    		
	    	this.$el.find('a').attr('href','kpiInfo/output?url=' + 
		        this.options.nowDate + '_' + this.options.insIdCd + 
		        'detail.xlsx&type=2&fileNm=' + this.options.insIdCd);

	    	grid.jqGrid({
                datatype: "json",
                url:'mainPageInfo/downloadDetail/'+ this.options.insIdCd+'/'+this.options.nowDate,
                colNames: ['指标名称', '指标值', '得分', '该指标最高值', '该指标最低值', '排名', '排名变化'],
                colModel: [
                    {name: 'ruleNm',index: 'ruleNm',width: 200,align:'center'},
                    {name: 'fmtRuleVal',index: 'fmtRuleVal',width: 100,align:'center',formatter:function(v,opt,row){
                    	if(v == -999999){
                    		return '--';
                    	} else if(v === ''){
                    		return '';
                    	} else {
                    		return v + row.unit;
                    	}
                    }},
                    {name: 'scoreVal',index: 'scoreVal',width: 100,align:'center',formatter:function(v){
                    	return (v!=-999999)?v.toFixed(2):'--';
                    }},
                    {name: 'fmtRuleValMax',index: 'fmtRuleValMax',width: 100,align:'center',formatter:function(v,opt,row){
                    	if(row.ruleTp != 0){
                    		return (v==-999999)?'--':(v + ((row.unit=='NULL')?'':row.unit));
                    	} else {
                    		return (row.scoreValMax==-999999)?'--':row.scoreValMax.toFixed(2);
                    	}
                    }},
                    {name: 'fmtRuleValMin',index: 'fmtRuleValMin',width: 100,align:'center',formatter:function(v,opt,row){
                    	if(row.ruleTp != 0){
                    		return (v==-999999)?'--':(v + ((row.unit=='NULL')?'':row.unit));
                    	} else {
                    		return (row.scoreValMin==-999999)?'--':row.scoreValMin.toFixed(2);
                    	}
                    }},
                    {name: 'scoreValRank',index: 'scoreValRank',width: 100,align:'center',formatter:function(v){
                    	return (v==-999999)?'--':v;
                    }},
                    {name: 'changeInRank',index: 'changeInRank',width: 100,align:'center',formatter:function(v){
                    	return (v==-999999)?'--':v;
                    }},
                ],
                hidegrid: false,
                viewrecords: true,
                rowNum:50,
                width:800,
			   	height:525,
                jsonReader: {
                    repeatitems: false,
                    root:"data"
                },
                loadComplete: function(res){
                	for(var i=0; i<res.data.length; i++){
                		if(res.data[i].ruleTp == 0){
                			// 修改行样式
                			grid.jqGrid('setRowData',(i+1),_.defaults(_.omit(res.data[i],'fmtRuleVal'),{fmtRuleVal:''}),{
                				background:'#eee'
                			});
                		}
                	}
                }
            });
	    }
	});
	
	return gridView;
});