define(function(require, exports, module) {
	"use strict";
	var labelDialogTpl = require('../../html/label-dialog.tpl');
	
	var Labels = require('../collection/labels'),
		labels = new Labels;
		
	
	var hotlabelTpl = [
		'{@each list as lt}',
    		'<span>@{lt.labelNm}</span>',
    	'{@/each}'
	].join('');
	
	var labelDialogView = Backbone.View.extend({
		tagName: 'div',
		id: 'upload-dialog',
	    events: {
	    	"click .hot-label span": "addHotLabel",
	    	"input input": "labelInputChange"
	    },
	
	    initialize: function() {
	        var me = this;
	        
	        _.bindAll(this, 'render', 'addExistLabel', 'addHotLabel', 'labelInputChange');
	        labels.fetch({
	        	url:'labels/hot',
	        	success:function(collection, response, options){
	        		var labelData = {
		    			list: collection.toJSON()
		    		};
	        		var hotlabelEl = juicer(hotlabelTpl, labelData);
	    			me.$el.find(".hot-label").append(hotlabelEl);
	        	}
	        });
	        this.render();
	    },
	
	    render: function() {
	    	var me = this;
	    	
	    	$(me.el).html(labelDialogTpl);
	    	
	    	/* multi value autocomplete */
            // 按分号分隔多个值
            function split(val) {
                return val.split(/;\s*/);
            }
            // 提取输入的最后一个值
            function extractLast(term) {
                return split(term).pop();
            }
            // 按Tab键时，取消为输入框设置value
            function keyDown(event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
						$(this).data("autocomplete").menu.active) {
                    event.preventDefault();
                } else if(event.keyCode == 13){
                	event.preventDefault();
                	me.confirmLabel();
                }
            }
	        var options = {
                // 获得焦点
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                // 从autocomplete弹出菜单选择一个值时，加到输入框最后，并以分号分隔
                select: function(event, ui) {
                    var terms = split(this.value);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    terms.push("");
                    this.value = terms.join("; ");
                    return false;
                }
            };
	        $(this.el).find("input").bind("keydown", keyDown)
	        	.autocomplete($.extend(options, {
                    minLength: 1,
                    source: function(request, response) {
                    	$.ajax({  
			                url: "labels/like",  
			                type: "get",  
			                data: {  
			                    term: extractLast(request.term) 
			                },  
			                dataType: "json",  
			                success: function(rsp) {
			                	var arr = [];
			                	for(var i=0; i<rsp.length; i++){
			                		arr.push(rsp[i].labelNm);
			                	}
			                    response(arr);
			                },  
			                error: function() {  
			                    response([]); 
			                }  
			            });
                    }
                }));
                
	    	me.addExistLabel(me.options.label);
	    	
	    	if($.browser.msie){
		    	$(me.el).find('input').bind('propertychange',function(){
		    		me.labelInputChange();
		    	});
	    	}
	    },
	    
	    addExistLabel: function(label){
	    	if(label != ''){
		    	$(this.el).find('input').val(label);
		    	this.labelInputChange();
	    	}
	    },
	    
	    addHotLabel:function(e){
	    	var text = $('#upload-dialog input').val(),
	        		labelArr = text.split(';');
        	if(labelArr.indexOf($(e.target).text())!='-1'){
        		return;
        	} else {
        		$('#upload-dialog input').val(text + $(e.target).text()+';');
	        	
	        	//点击后可选标签样式改变
	        	$(e.target).css({
	        		'color':'#787878',
	        		'cursor':'default',
	        		'background':'#d7d7d7',
	        		'border':'1px solid #c8c8c8'
	        	});
        	}
	    },
	    
	    labelInputChange:function(){
	    	var hotLabelArr = $(this.el).find('.hot-label span'),
        		myLabelArr = $(this.el).find('input').val().split(';'),
        		hotLen = hotLabelArr.length,
        		myLen = myLabelArr.length;
        	for(var i=0;i<hotLen;i++){
        		var flag = true;
        		for(var j=0;j<myLen;j++){
        			if($(hotLabelArr[i]).text() == myLabelArr[j].replace(/(^\s*)|(\s*$)/g, "")){
        				$(hotLabelArr[i]).css({
			        		'color':'#787878',
			        		'cursor':'default',
			        		'background':'#d7d7d7',
			        		'border':'1px solid #c8c8c8'
			        	});
			        	flag = false;
			        	break;
        			}
        		}
        		if(flag){
        			$(hotLabelArr[i]).css({
		        		'color':'#fff',
		        		'cursor':'pointer',
		        		'background':'transparent url(resources/img/tag-bg.png) repeat',
		        		'border':'0px'
		        	});
        		}
        	}
	    }
	});
	
	return labelDialogView;
});