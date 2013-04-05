define(function(require, exports, module) {
	"use strict";
	
	var plupload = require('plupload');
	
	var QueryOwnFileView = require("./queryOwnFile"),
		LabelDialogView = require('./labelDialog'); 
	
	var uploadTpl = require('../../html/uploadFile.tpl');
	
	var selectTpl = [
 		'{@each list as lt}',
     		'<option value=@{lt.userId}_@{lt.instId}>@{lt.username} —— @{lt.instname}</option>',
     	'{@/each}'
 	].join('');	
	
	var UploadView = Backbone.View.extend({
		className: 'row-fluid file-manage',
		template: juicer(selectTpl),
	    events: {
	    	// button
	    	"click .query-link": 'redirectQuery',
	    	"click .clear-all": "allClear",
	    	"click .upload": "uploadFile",
	    	// file
	    	"click i.file-delete": "deleteFile",
	    	// person
	    	"click .check-all": "togglePerson",
	    	"click .query-person": "queryPerson",
	    	"dblclick .persons-list select option": "choosePerson",
	    	// label
	    	"click .add-labels": "addLabel",
    		"click .tag-delete": "deleteTag"
	    },
	
	    initialize: function() {
	        var me = this;
	        
	        this.render();
	    },
	
	    render: function() {
	    	$(this.el).html(uploadTpl);
	    	
	    	var me = this;
	    	
	    	if($.browser.msie){
		    	$(this.el).find('input').bind('propertychange',function(){
		    		this.labelInputChange();
		    	});
	    	}
	    },
	    
	    redirectQuery: function(e){
	    	e.preventDefault();
	    	
	    	this.$el.find('.file-upload').hide();
	    	if(!this.queryOwnFileView){
	    		this.queryOwnFileView = new QueryOwnFileView();
	    		this.$el.append(this.queryOwnFileView.el);
	    		
	    		this.queryOwnFileView.renderGrid();
	    	} else {
	    		this.queryOwnFileView.$el.show();
	    	}
	    },
	    
	    allClear: function(){
	    	var me = this;
	    	
    		me.$el.find('i.file-delete').each(function(){
    			var fileDom = $(this).closest('.file-item'),
    				fileId = fileDom.attr('id'),
    				file = me.uploader.getFile(fileId);
    				
    			if(file){
					me.uploader.removeFile(file);
				}
	            fileDom.closest('.file-block').remove();
    		});
    		me.$el.find('.labels-to-upload .label-list .tag-list').html('');
    		me.$el.find('.persons-to-upload .tag-list').html('');
    		me.$el.find('.desc-to-upload').val('');
	    },
	    
	    uploadFile: function(e){
	    	e.preventDefault();
	    	
	    	if(this.$el.find('.files-to-upload .tag-list .file-item').length > 0 
			&& this.$el.find('.persons-to-upload .tag-list span').length > 0){
		        
	    		this.uploader.start();
	        } else {
	        	alert('出错');
	        }
	    },
	    
	    addPlupload: function(){
	    	var me = this;
	    	this.uploader = new plupload.Uploader({
		        runtimes : 'html5,flash,html4',
		        browse_button : 'pickfiles',
		        container : 'file-upload-ie7',
		        max_file_size : '10mb',
		        url : 'file/upload',
		        flash_swf_url: 'resources/plupload/plupload.flash.swf'
		    });
		    
	    	this.uploader.init();
		 
	    	this.uploader.bind('FilesAdded', function(up, files) {
		        $.each(files, function(i, file) {
		        	if(file.size <= 10485760){
			            me.$el.find('.files-to-upload .tag-list').append(
		        	        '<div class="file-block"><div id="' + file.id + '" class="file-item">' +
			                '<i class="icon-remove-sign icon-white file-delete"></i>'+
			                file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
	               	    '</div></div><div style="clear:both;"></div>');
            		} else {
            			me.$el.find('.files-to-upload .tag-list').append(
        					'<div class="file-block"><div id="' + file.id + '" class="file-item">' +
			                '<i class="icon-remove-sign icon-white file-delete"></i>'+
			                file.name + ' (' + plupload.formatSize(file.size) + ')' +
	                		'</div><span style="color:red;margin-left:5px;line-height:30px;font-size:12px;">文件大于10M,无法上传</span></div><div style="clear:both;"></div>');
            		}
		        });
		        up.refresh(); // Reposition Flash/Silverlight
		    });
		 
	    	this.uploader.bind('uploadComplete', function(up, files) {
		        if (up.files.length === (up.total.uploaded + up.total.failed)) {     
                	$('#shadow-modal').remove();
//                	udp.sandbox.publish('fileCountUpdate');
	            }
		    });
		    
	    	this.uploader.bind('UploadProgress', function(up, file) {
		        $('#' + file.id + " b").html(file.percent + "%");
		        if(file.percent == 100){
		        	file.status = plupload.DONE;
		        }
		    });
		    
	    	this.uploader.bind("BeforeUpload", function(up,file) {
		    	var labelNm = '', desc = '', userNm='', userType='',
		    		arrLabel = $('#labels-to-upload span'),
		    		arrPerson = $('#persons-to-upload span'),
		    		labelLen = arrLabel.length,
		    		personLen = arrPerson.length;
		    	for(var i=0; i<labelLen; i++){
		    		labelNm += $(arrLabel[i]).text()+';';
		    	}
		    	for(var i=0; i<personLen; i++){
		    		if($(arrPerson[i]).data('personid') == 'alluser'){
		    			userType = 'alluser';
		    		} else {
		    			userNm += $(arrPerson[i]).data('personid')+ '_' + $(arrPerson[i]).text()+';';
	    			}
		    	}
		    	desc = $('#desc-to-upload').val();
	            me.uploader.settings.multipart_params = {labelNm: labelNm, userNm: userNm, userType: userType, desc: desc};
	            
	            if($('#shadow-modal').length == 0){
	            	$('<div id="shadow-modal" class="modal-backdrop fade in"></div>').appendTo(document.body);
	            }
	        });
		 
	    	this.uploader.bind('Error', function(up, err) {
		        $('#' + err.file.id + " b").html("");
		        $('#' + err.file.id).after("<span style='color:red;'>上传失败</span>");
		 		
		        up.refresh();
		    });
		 
	    	this.uploader.bind('FileUploaded', function(up, file, info) {
		    	if(info.response == 'success'){
			        $('#' + file.id).after('<img style="margin:5px;" src="resources/img/upload-done.png"/>');
		        } else {
		        	$('#' + file.id + " b").html("");
			        $('#' + file.id).after("<span style='color:red;'>上传失败</span>");
		        }
		    });
	    },
	    
	    deleteFile: function(e){
	    	e.preventDefault();
	    	
	    	var me = this;
	    	var fileDom = $(e.target).closest('.file-item'),
				fileId = fileDom.attr('id'),
				file = me.uploader.getFile(fileId);
    			
			if(file){
				me.uploader.removeFile(file);
			}
            fileDom.closest('.file-block').remove();
	    },
	    
	    addLabel: function(e){
	    	e.preventDefault();
	    	
	    	var me = this;
	    	var existLabel = '';
	        $.each(me.$el.find('.labels-to-upload .tag-list span'),function(i, label){
	        	existLabel += $(label).text()+';';
	        });
	    	
	    	if(!me.labelDialogView){
	    		me.labelDialogView = new LabelDialogView({
    				label:existLabel
    			});
    			
		        art.artDialog({
		            padding:'5',
		            content:this.labelDialogView.el,
		            opacity:'0.1',
		            zIndex:100000,
		            close: function(){
		            	me.labelDialogView = null;
		            },
		            ok: function () {
		            	var labelArr = $('#upload-dialog input').val().split(';'),
				        	htmlText = '';
			        	$.each(labelArr,function(i,item){
			        		if(item.replace(/(^\s*)|(\s*$)/g, "") != ''){
			        			htmlText += '<span class="tag"><i class="icon-remove-sign icon-white tag-remove"></i>'+item+'</span>';
			        		}
			        	}); 
			        	me.$el.find('.labels-to-upload .tag-list').html(htmlText);
				    },
				    okVal:'确定'
		        }).lock();
	    	}
	    },
	    
	    deleteTag: function(e){
	    	e.preventDefault();
	    	
	    	$(e.target).closest('span').remove();
	    },
	    
	    togglePerson: function(e){
	    	var target = $(e.target);
	    	if(!target.attr('checked')){
	    		this.$el.find('.persons-detail').slideDown();
	    		this.$el.find('.persons-to-upload span').html('');
	    	} else {
	    		this.$el.find('.persons-detail').slideUp();
	    		this.$el.find('.persons-to-upload .tag-list').html('');
	    		this.$el.find('.persons-to-upload span').html('所有人可见');
	    	}
	    },
	    
	    queryPerson: function(e){
	    	e.preventDefault();
	    	var me = this;
	    	var $term = me.$el.find('[name="username"]').val(),
	    		$insCd = me.$el.find('[name="instname"] option:selected').val(),
	    		$deptNm = me.$el.find('[name="deptname"]').val();
	    	
	    	$.ajax({
	    		url:'filesusers/precise?term=' + encodeURIComponent($term) + '&insCd=' + $insCd +
	    			'&deptNm=' + encodeURIComponent($deptNm),
	    		dataType:'json',
	    		type:'get',
	    		success:function(res){
	    			var results = {
		    			list: res
		    		};
	        		var selectionEl = me.template.render(results);
	    			me.$el.find(".persons-list select").html(selectionEl);
	    		}
	    	});
	    },
	    
	    choosePerson: function(e){
	    	var target = $(e.target);
	    	
	    	this.$el.find('.persons-to-upload .tag-list').append(
    			'<span class="tag"><i class="icon-remove-sign icon-white tag-delete"></i>' +
    			target.text() +
    			'</span>'
	    	);
	    }
	    
	});
	
	return UploadView;
});