define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.file.docs');
	var tpl = require('../../html/downloadFile.tpl');
	var Files = require('../collection/files'),
		files = new Files;
	
	var DownloadFileView = Backbone.View.extend({
		className: 'row-fluid file-download',
		
	    events: {
	    	"click a.downBtn": "downloadRecord",
	    	"click button.submit": "submitForm",
	    	"click button.clear": "clearForm"
	    },
	
	    initialize: function() {
	        var me = this;
	      
	        this.render();
	    },
	
	    render: function() {
	    	var me = this;
	    	this.$el.html(tpl);
	    	
	    	this.$el.find(".startTime").datepicker({
	    		dateFormat:"yy-mm-dd",
	    		changeMonth: true,
    	        changeYear: true,
	    		onSelect: function( selectedDate ) {
	    			me.$el.find(".endTime").datepicker( "option", "minDate", selectedDate );
		        }
	    	});
	    	this.$el.find(".endTime").datepicker({
	    		dateFormat:"yy-mm-dd",
	    		maxDate:0,
	    		changeMonth: true,
    	        changeYear: true,
    		    onSelect: function( selectedDate ) {
    		    	me.$el.find(".startTime").datepicker( "option", "maxDate", selectedDate );
	        	}
	    	});
	    },
	    
	    renderGrid:function(){
	    	function btnFormat(cellvalue, options, rowObject) {
                return "<a href='javascript:void(0)' class='downBtn' data-fileid=" + rowObject['fileId'] + "><img src='resources/img/download.png'/></a>";
            }
	    	
	    	this.$el.find("#file-docs-list1").jqGrid({
				datatype: "json",
				url: 'files/user',
			   	colNames: ['文件ID','文件名称', '标签名称', '上传人', '上传时间', '文件描述', '点击量', '文件状态','下载'],
			   	colModel:[
					{name:'fileId',index:'fileId', hidden:true},			   		
		   			{name:'fileNm',index:'fileNm', width:100, align:'center'},
			   		{name:'labelNm',index:'labelNm', sortable:false, width:100, align:'center'},
			   		{name:'uploaderNm',index:'uploaderNm', width:60, align:'center'},
			   		{name:'createTs',index:'createTs', width:120,align:'center', formatter:function(v){
		   				return v.substr(0,16);
			   		}},
			   		{name:'desc',index:'desc', sortable:false, width:120, align:'center'},
			   		{name:'downloadTimes',index:'downloadTimes',width:50, align:'center'},		
			   		{name:'readTp',index:'readTp',sortable:false,width:50,align:'center',formatter:function(v){
			   			if(v == '0'){
			   				return '<span style="color:red;">未读</span>';
			   			} else {
			   				return '已读';
			   			}
			   		}}, {
                    name: 'oper',
                    index: 'oper',
                    width: 50,
                    sortable: false,
                    align: "center",
                    formatter: btnFormat
                }],
			   	rowNum:10,
			   	sortname: 'fileId',
			   	width:850,
			   	height:280,
			   	hidegrid: false,
			    viewrecords: true,
			    pager: '#file-docs-pager1',
			    sortorder: "desc",
			    caption:"可下载文件列表",
			    multiselect: true,
			    jsonReader : {  
			       root:"data",   
			       repeatitems: false,
			       id: "0" 
			    },
			    loadComplete:function(res){
			    	files.reset(res.data);
			    }
			}).navGrid('#file-docs-pager1',{
				edit:false,
				add:false,
				del:false,
				search:false,
				refresh:false
			}).navButtonAdd('#file-docs-pager1',{  
			   caption:"批量下载",
			   buttonicon:'ui-icon-circle-arrow-s',
			   onClickButton: function(){
				   	var r = $("#file-docs-list1").jqGrid('getGridParam','selarrrow'),
		    			str ='';
			    	if(r.length != 0){
				    	for(var i=0; i<r.length; i++){
				    		str += r[i]+',';
				    	}
				    	if(str.length >=1){
				    		str = str.substr(0,str.length-1);
				    	}
				    	$.ajax({
				    		url:'file/download/user',
				    		type:'get',
				    		data: {  
			                    fileIdLine: str
			                },
			                dataType: "json", 
			                success: function(rsp) {
			                	window.location.href = 'file/output?url='+rsp.key+'&fileNm='+rsp.value;
			                	setTimeout(function(){
			                		udp.sandbox.publish('fileCountUpdate');
			                	},500);
			                }
				        });
			        } else {
			        	var dialog = art.artDialog({
			        		title: '注意',
						    content: '请选择至少一个文件下载！',
						    icon: 'warning',
						    opacity: 0.1
			        	}).lock();
			        }
			   }
			});
	    },
	    
	    downloadRecord: function(e){
	    	var fileId = $(e.target).closest('a').data('fileid');
	    	
	    	$.ajax({
	    		url:'file/download/user',
	    		type:'get',
	    		data: {  
	                fileIdLine: fileId
	            },
	            dataType: "json", 
	            success: function(rsp) {
	            	window.location.href = 'file/output?url='+rsp.key+'&fileNm='+rsp.value;
	            	setTimeout(function(){
	            		udp.sandbox.publish('fileCountUpdate');
	            	},500);
	            }
	        });
	    },
	    
	    submitForm: function(e){
            e.preventDefault();
            var query = this.$el.find('form').serialize();
            $("#file-docs-list1").jqGrid('setGridParam', {
                url: "files/user?" + query
            }).trigger("reloadGrid", [{
                page: 1
            }]);
	    },
	    
	    clearForm: function(e){
	    	e.preventDefault();
	    	this.$el.find('form input').val('');
	    }
	    
	});
	
	return DownloadFileView;
});