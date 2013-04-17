define(function(require, exports, module) {
	"use strict";
	var querylogTpl = require('../../html/querylog.tpl');
	
	var queryLogView = Backbone.View.extend({
		tagName: 'div',
		className: 'row-fluid admin-log',
		
	    events: {
	    	"click button.submit": "submitForm",
	    	"click button.clear": "clearForm"
	    },
	    initialize: function() {
	        var me = this;
	      
	        this.render();
	    },
	
	    render: function() {
	    	$(this.el).html(querylogTpl);

	    	$(this.el).find(".startdate").datepicker({
	    		dateFormat:"yymmdd",
	    		changeMonth: true,
    	        changeYear: true,
	    		onSelect: function( selectedDate ) {
	    			$(this.el).find(".enddate").datepicker( "option", "minDate", selectedDate );
		        }
	    	});
	    	$(this.el).find(".enddate").datepicker({
	    		dateFormat:"yymmdd",
	    		changeMonth: true,
    	        changeYear: true,
	    		maxDate:0,
    		    onSelect: function( selectedDate ) {
    		    	$(this.el).find(".startdate").datepicker( "option", "maxDate", selectedDate );
	        	}
	    	});
	    },
	    
	    renderGrid:function(){
	    	$("#admin-log-list").jqGrid({
				datatype: "json",
			   	colNames:[ '用户','机构ID','模块', '操作类型','状态','说明','时间'],
			   	colModel:[
			   		{name:'userNm',index:'userNm', width:150},
			   		{name:'insIdCd',index:'insIdCd', width:100, align:"right"},		
			   		{name:'moduleNm',index:'moduleNm', width:50,align:"right"},		
			   		{name:'operTp',index:'operTp', width:80,align:"right"},	
			   		{name:'operSt',index:'operSt', width:60,align:"right"},	
			   		{name:'desc',index:'desc', width:200,align:"right"},	
			   		{name:'createTs',index:'createTs', width:100,align:"right"}	
			   	],
			   	rowNum:15,
			   	sortname: 'createTs',
			   	sortorder: "desc",
			   	hidegrid: false,
			    viewrecords: true,
			    width: 900,
			    height: 350,
			    pager: '#admin-log-pager',
			    caption:"日志查询结果",
			    jsonReader : {  
			       root:"data",   
			       repeatitems: false
			    }
			}).navGrid('#admin-log-pager',{edit:false,add:false,del:false});
	    },
	    
	    submitForm: function(e){
	    	e.preventDefault();
	    	var query = this.$el.find('form').serialize();
            $("#admin-log-list").jqGrid('setGridParam', {
            	url: "admin/log?" + query
            }).trigger("reloadGrid", [{
                page: 1
            }]);

	    },
	    clearForm:function(e){
	    	e.preventDefault();
	    	this.$el.find('form input').val('');
	    }
	});
	
	return queryLogView;
});