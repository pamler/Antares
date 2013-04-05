define(function(require, exports, module) {
    "use strict";
    var tpl = require('../../html/changepwd.tpl');

    var Pwd = require('../model/pwdModel'),
    	pwd = new Pwd;
    
    var changePwdView = Backbone.View.extend({
    	tagName: "div",
    	className: "home-change-pwd",
        events: {
        	"click button.submit": "savePwd",
        	"click button.clear": "clearPwd",
        	"blur .pwd-old-input": "blurOldPwd",
        	"blur .pwd-new-input": "blurNewPwd",
        	"blur .pwd-confirm-input": "blurConfirmPwd"
    	},
    	
    	initialize: function(){
    		var me = this;
    		me.$el.html(tpl);
    	}, 
    	blurOldPwd: function(){
        	var me=this;
        	var msg ='';
        	var oldPwd = me.$el.find('.pwd-old-input').val();
        	if(oldPwd.length<1 || oldPwd.length>30){
        		msg = '*原密码长度必须大于等于1位且小于等于30位';
        	}
        	me.$el.find('.pwd-msg-old-label').html('<font color="red" >'+msg+'</font>');
        },
        blurNewPwd: function(){
        	var me=this;
        	var msg ='';
        	var newPwd = me.$el.find('.pwd-new-input').val();
        	if(newPwd.length<6 || newPwd.length>30){
        		msg = '*密码长度必须大于等于6位且小于等于30位';
        	}
    		var a = newPwd.split(""); 
    		for (var i=0;i<a.length;i++) {
    			var charVal = a[i].charCodeAt(0);
    			if (charVal < 33 || (93 < charVal && charVal < 97) || 126 < charVal) {
    				msg='*字符'+a[i]+'非法!';
    			}
    		}
        	me.$el.find('.pwd-msg-new-label').html('<font color="red" >'+msg+'</font>');
        },
        blurConfirmPwd: function(){
        	var me=this;
        	var msg ='';
        	var confirmPwd = me.$el.find('.pwd-confirm-input').val();
        	var newPwd = me.$el.find('.pwd-new-input').val();
        	if(newPwd!=confirmPwd){
        		msg = '*两次输入的新密码不一致,请重新输入';
        	}else{
        	}
        	me.$el.find('.pwd-msg-confirm-label').html('<font color="red" >'+msg+'</font>');
        },
        savePwd: function(e){
        	e.preventDefault();
        	var me = this;
        	var oldPwd = me.$el.find('.pwd-old-input').val();
			var newPwd = me.$el.find('.pwd-new-input').val();
			var confirmPwd = me.$el.find('.pwd-confirm-input').val();
			var validate = true;
			//密码校验
        	if(oldPwd.length<1 || oldPwd.length>30){
        		var msg0 = '*原密码长度必须大于等于0位且小于等于30位';
        		me.$el.find('.pwd-msg-old-label').html('<font color="red" >'+msg0+'</font>');
        		validate = false;
        	}
			if(newPwd.length<6 || newPwd.length>30){
        		var msg1 = '*密码长度必须大于等于6位且小于等于30位';
        		me.$el.find('.pwd-msg-new-label').html('<font color="red" >'+msg1+'</font>');
        		validate = false;
        	}else{
        		var a = newPwd.split("");
        		for (var i=0;i<a.length;i++) {
        			var charVal = a[i].charCodeAt(0);
        			if (charVal < 33 || (93 < charVal && charVal < 97) || 126 < charVal) {
        				var msg3='*字符'+a[i]+'非法!';
        				me.$el.find('.pwd-msg-new-label').html('<font color="red" >'+msg3+'</font>');
        				validate = false;
        			}
        		}
        	}
			if(newPwd!=confirmPwd){
        		var msg2 = '*两次输入的新密码不一致,请重新输入';
        		me.$el.find('.pwd-msg-confirm-label').html('<font color="red" >'+msg2+'</font>');
        		validate = false;
        	}
			//校验通过，可以提交
        	if( validate == true ){
		    	pwd = new Pwd;
				pwd.set("oldPwd",oldPwd);
				pwd.set("newPwd",newPwd);
				pwd.set("confirmPwd",confirmPwd);
				pwd.save({},{
					success: function(response){
						if(response && response.attributes ){
							if(response.attributes.errMessage){
								me.$el.find('.pwd-change-msg').html('<b><center><font color="red" >密码修改出错!<font></center></b>');
							}else if(response.attributes.value){
								me.$el.find('form input').val('');
			    				me.$el.find('.pwd-change-msg').html('<b><center><font color="red" >'+response.attributes.value+'<font></center></b>');
							}
						}else{
							me.$el.find('.pwd-change-msg').html('<b><center><font color="red" >密码修改出错!<font></center></b>');
						}
					},
		    		error: function(response){
		    			me.$el.find('.pwd-change-msg').html('<b><center><font color="red" >密码修改出错!<font></center></b>');
					}
				});
			
        	}else{//校验失败，提醒用户更正
            	
        	}
        },
        clearPwd: function(e){
        	var me = this;
	    	e.preventDefault();
	    	me.$el.find('form input').val('');
	    	me.$el.find('.pwd-change-msg').html('');
	    	me.$el.find('.pwd-msg-old-label').html('');
	    	me.$el.find('.pwd-msg-new-label').html('');
	    	me.$el.find('.pwd-msg-confirm-label').html('');
	    	me.$el.find('.pwd-change-with-error').text('cleared');
        }
        
    });
    return changePwdView;
});