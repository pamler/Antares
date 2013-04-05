define(function(require, exports, module) {
    "use strict";
    
    var queryfileTpl = require('../../html/queryownFile.tpl');
    
    var Files = require('../collection/files'),
		files = new Files;

    var queryFileView = Backbone.View.extend({
    	className: 'span20 file-query',
    	
        events: {
            "click .upload-link": "redirectUpload",
        	"click a.delBtn": "delRecord",
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
        	$(this.el).html(queryfileTpl);
            
            this.$el.find(".startTime").datepicker({
                dateFormat: "yy-mm-dd",
                changeMonth: true,
    	        changeYear: true,
                onSelect: function(selectedDate) {
                	me.$el.find(".endTime").datepicker("option", "minDate", selectedDate);
                }
            });
            this.$el.find(".endTime").datepicker({
                dateFormat: "yy-mm-dd",
                changeMonth: true,
    	        changeYear: true,
                maxDate: 0,
                onSelect: function(selectedDate) {
                	me.$el.find(".startTime").datepicker("option", "maxDate", selectedDate);
                }
            });

            return this;
        },
        
        redirectUpload: function(e){
        	e.preventDefault();
	    	
	    	this.$el.hide();
	    	this.$el.siblings('.file-upload').show();
        },
        
        delRecord: function(e) {
            var target = $(e.target).parent();
            
            var dialog = art.dialog({
			    title: '确认删除',
			    content: "删除文件名称为" + target.data('filenm') + "?",
			    icon: 'question',
			    ok: function(){
			        $.ajax({
	            		url: 'file/'+target.data('fileid'),
	            		type: 'delete',
	            		dataType: 'json',
	            		success: function(){
	            			var curPage = $("#file-docs-list2").jqGrid('getGridParam','page');
	            			$("#file-docs-list2").jqGrid('setGridParam',{page:curPage}).trigger("reloadGrid");
	            		}
	            	});
			    },
			    cancel: true
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
//	            	setTimeout(function(){
//	            		udp.sandbox.publish('fileCountUpdate');
//	            	},500);
	            }
	        });
        
        },
        
        submitForm: function(e) {
            e.preventDefault();
            var query = this.$el.find('form').serialize();

            $("#file-docs-list2").jqGrid('setGridParam', {
                url: "files/uploader?" + query
            }).trigger("reloadGrid", [{
                page: 1
            }]);
        },
        
        clearForm: function(e){
        	e.preventDefault();
        	this.$el.find('form input').val('');
        },

        renderGrid: function() {
            var list = this.$el.find("#file-docs-list2");

            function btnFormat(cellvalue, options, rowObject) {
                return "<a style='margin:0px 3px;' href='javascript:void(0)' class='delBtn' data-fileid=" + rowObject['fileId'] + " data-filenm=" + rowObject['fileNm'] + "><img src='resources/img/del.png'/></a>" +
                		"<a style='margin:0px 3px;' href='javascript:void(0)' class='downBtn' data-fileid=" + rowObject['fileId'] + " data-filenm=" + rowObject['fileNm'] + "><img src='resources/img/download.png'/></a>";
            }
            list.jqGrid({
                datatype: "json",
                url:'files/uploader',
                colNames: ['文件ID','文件名称', '标签名称', '可见人', '上传人', '上传时间', '文件描述', '点击量', '删除/下载'],
                colModel: [{
                	name: 'fileId',
                    index: 'fileId',
                    hidden:true
                }, {
                    name: 'fileNm',
                    index: 'fileNm',
                    align: "center",
                    width: 100
                }, {
                	name: 'labelNm',
                    index: 'labelNm',
                    sortable:false,
                    align: "center",
                    width: 100
                }, {
                	name: 'userNm',
                    index: 'userNm',
                    sortable:false,
                    align: "center",
                    width: 60
                },{
                	name: 'uploaderNm',
                    index: 'uploaderNm',
                    align: "center",
                    width: 60
                }, {
                	name: 'createTs',
                    index: 'createTs',
                    align: "center",
                    width: 120,
                    formatter:function(v){
		   				return v.substr(0,16);
			   		}
                }, {
                    name: 'desc',
                    index: 'desc',
                    sortable:false,
                    align: "center",
                    width: 120
                }, {
                    name: 'downloadTimes',
                    index: 'downloadTimes',
                    width: 50,
                    align: "center"
                }, {
                    name: 'oper',
                    index: 'oper',
                    width: 70,
                    sortable: false,
                    align: "center",
                    formatter: btnFormat
                }],
                rowNum: 10,
                sortname: 'fileId',
                width:850,
			   	height:280,
                hidegrid: false,
                viewrecords: true,
                pager: '#file-docs-pager2',
                multiselect: true,
                sortorder: "desc",
                caption: "我上传的文件",
                loadComplete:function(res){
			    	files.reset(res.data);
			    },
                jsonReader: {
                    root: "data",
                    repeatitems: false,
                    id: "0"
                }
            }).navGrid('#file-docs-pager2', {
                edit: false,
                add: false,
                del: false,
                search: false,
                refresh: false
            }).navButtonAdd('#file-docs-pager2',{  
			   caption:"批量下载",
			   buttonicon:'ui-icon-circle-arrow-s',
			   onClickButton: function(){
				   	var r = $("#file-docs-list2").jqGrid('getGridParam','selarrrow'),
		    			str ='';
			    	
			    	if(r.length != 0){
				    	for(var i=0; i<r.length; i++){
				    		str += r[i]+',';
				    	}
				    	if(str.length >=1){
				    		str = str.substr(0,str.length-1);
				    	}
				    	$.ajax({
				    		url:'file/download/uploader',
				    		type:'get',
				    		data: {  
			                    fileIdLine: str
			                },
			                dataType: "json", 
			                success: function(rsp) {
			                	window.location.href = 'file/output?url='+rsp.key+'&fileNm='+rsp.value;
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
        }

    });

    return queryFileView;
});