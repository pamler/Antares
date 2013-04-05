define(function(require, exports, module) {
    "use strict";
    
    var sandbox = require('sandbox.kpi.fbmi');
    var tpl = require('../../html/phoneMail.tpl');
    
    var Contact = require('../model/contactModel'),
    	Subscription = require('../model/subscriptionModel'),
    	contact = new Contact,
    	subscription = new Subscription;
    
    var notifyView = Backbone.View.extend({
       
    	tagName: "div",
    	className: "bmi-notify",
        events: {
        	"click a.modify": "modifyContact",
        	"click a.register": "modifyContact",
        	"click a.delete": "deleteContact",
        	"click a.save": "saveContact",
        	"click a.cancel": "restoreContact",
        	"click a.test": "testContact"
    	},
    	
    	initialize: function(){
    		this.$el.html(tpl);
    		
    		this.render();
    		
    		var $header = this.$el.find('.subscription td.first'),
				txt = $header.text();
    		$header.text(txt.replace('分公司', this.options.insNm));
    	},
        
        render: function() {
            var me = this;
            
            contact.fetch({
            	success:function(model, response, options){
            		me.phoneNumber = model.get('mobile1');
            		me.maskPhoneNumber = me.phoneNumber?(me.phoneNumber.substr(0,3)+'****'+me.phoneNumber.substr(7,4)):'';
            		me.emailNumber = model.get('email1');
            		me.maskEmailNumber = me.emailNumber?me.emailNumber.replace('@unionpay.com',''):'';
            		
            		// 手机号是否注册
            		if(me.phoneNumber){
            			me.$el.find('dd.phone-content').text(me.maskPhoneNumber);
            			me.$el.find('dd.phone-manage').html('<a class="modify">修改</a><a class="delete">删除</a><a class="test">测试</a>');
            			me.$el.find('[name="bmi-phone"]').show();
            		} else {
            			me.$el.find('dd.phone-content').html('<span style="color:#999;font-size:13px;">未注册</span>');
            			me.$el.find('dd.phone-manage').html('<a class="register">立即注册</a>');
            			// 短信绑定未开通
	    	    		me.$el.find('.subscription th').eq(1).html('短信<span style="color:red;">未开通</span>');
	    	    		me.$el.find('[name="bmi-phone"]').removeAttr("checked").hide();
            		}
            		// email是否注册
        			if(me.emailNumber){
            			me.$el.find('dd.email-content').text(me.emailNumber);
            			me.$el.find('dd.email-manage').html('<a class="modify">修改</a><a class="delete">删除</a><a class="test">测试</a>');
            			me.$el.find('[name="bmi-email"]').show();
            		} else {
            			me.$el.find('dd.email-content').html('<span style="color:#999;font-size:13px;">未注册</span>');
            			me.$el.find('dd.email-manage').html('<a class="register">立即注册</a>');
            			// 邮件绑定未开通
	    	    		me.$el.find('.subscription th').eq(2).html('邮件<span style="color:red;">未开通</span>');
	    	    		me.$el.find('[name="bmi-email"]').removeAttr("checked").hide();
            		}
            	}
            });
            
            subscription.fetch({
            	data: $.param({instId: me.options.insIdCd}),
            	success:function(model, response, options){
            		if(model.get('bmiEmailBinding') == '1'){
            			me.$el.find('input[name="bmi-email"]').attr('checked',true);
            		}
        			if(model.get('bmiMobileBinding') == '1'){
        				me.$el.find('input[name="bmi-phone"]').attr('checked',true);
            		}
            	}
            });
            
            return me;
        },
        
        modifyContact: function(e){
        	var target = $(e.target),
        		$dd = target.closest('dd');
        	if($dd.hasClass('phone-manage')){
        		var phoneContent = this.$el.find('dd.phone-content');
        		
        		phoneContent.html('<input type="text" class="phone-input"/><a class="save">保存</a><a class="cancel">取消</a>')
        			.find('input').val(this.maskPhoneNumber);
        		this.$el.find('.phone-manage').hide();
        	} else if($dd.hasClass('email-manage')){
        		var emailContent = this.$el.find('dd.email-content');
        		
        		emailContent.html('<input type="text" class="email-input"/><span style="font-size:13px;color:#333;"> @unionpay.com</span><a class="save">保存</a><a class="cancel">取消</a>')
        			.find('input').val(this.maskEmailNumber);
        		this.$el.find('.email-manage').hide();
        	}
        },
        
        saveContact: function(e){
        	var me = this,
        		target = $(e.target),
        		$dd = target.closest('dd');
	    	if($dd.hasClass('phone-content')){
	    		var newPhoneNumber = this.$el.find('dd.phone-content input').val();
	    		if($.trim(newPhoneNumber).match(/^\d{11}$/)){
		    		contact.set("mobile1",newPhoneNumber);
		    		contact.save({},{
		    			success: function(){
		    				me.phoneNumber = newPhoneNumber;
		    				me.maskPhoneNumber = me.phoneNumber.substr(0,3)+'****'+me.phoneNumber.substr(7,4);
		    				me.$el.find('dd.phone-content').html(me.maskPhoneNumber);
		            		me.$el.find('.phone-manage').html('<a class="modify">修改</a><a class="delete">删除</a><a class="test">测试</a>').show();
		            		me.$el.find('.subscription th').eq(1).html('短信');
		            		me.$el.find('[name="bmi-phone"]').show();
		    			}
		    		});
	    		} else {
	    			alert('手机号输入错误或不能为空!');
	    		}
	    	} else if($dd.hasClass('email-content')){
	    		var newEmailNumber = this.$el.find('dd.email-content input').val();
	    		if($.trim(newEmailNumber) != ''){
		    		contact.set("email1",newEmailNumber+'@unionpay.com');
		    		contact.save({},{
		    			success: function(){
		    				me.emailNumber = newEmailNumber+'@unionpay.com';
		    				me.maskEmailNumber = newEmailNumber;
		    				me.$el.find('dd.email-content').html(me.emailNumber);
		            		me.$el.find('.email-manage').html('<a class="modify">修改</a><a class="delete">删除</a><a class="test">测试</a>').show();
		            		me.$el.find('.subscription th').eq(2).html('邮件');
		            		me.$el.find('[name="bmi-email"]').show();
		    			}
		    		});
	    		} else {
	    			alert('邮箱地址不能为空!');
	    		}
	    	}
        },
        
        restoreContact: function(e){
        	var target = $(e.target),
        		$dd = target.closest('dd');
        	if($dd.hasClass('phone-content')){
        		if(this.phoneNumber){
        			this.$el.find('dd.phone-content').html(this.maskPhoneNumber);
        		} else {
        			this.$el.find('dd.phone-content').html('<span style="color:#999;font-size:13px;">未注册</span>');
        		}
        		this.$el.find('.phone-manage').show();
        	} else if($dd.hasClass('email-content')){
        		if(this.emailNumber){
        			this.$el.find('dd.email-content').html(this.emailNumber);
        		} else {
        			this.$el.find('dd.email-content').html('<span style="color:#999;font-size:13px;">未注册</span>');
        		}
        		this.$el.find('.email-manage').show();
        	}
        },
        
        deleteContact: function(e){
        	var me = this,
	    		target = $(e.target),
	    		$dd = target.closest('dd');
	    	if($dd.hasClass('phone-manage')){
	    		contact.save({mobile1:''},{
	    			success: function(){
	    				me.phoneNumber = '';
	    				me.maskPhoneNumber = '';
	    				me.$el.find('dd.phone-content').html('<span style="color:#999;font-size:13px;">未注册</span>');
	    	    		me.$el.find('dd.phone-manage').html('<a class="register">立即注册</a>');
	    	    		
	    	    		// 短信绑定未开通
	    	    		me.$el.find('.subscription th').eq(1).html('短信<span style="color:red;">未开通</span>');
	    	    		me.$el.find('[name="bmi-phone"]').removeAttr("checked").hide();
	    			}
	    		});
	    	} else if($dd.hasClass('email-manage')){
	    		contact.save({email1:''},{
	    			success: function(){
	    				me.emailNumber = '';
	    				me.maskEmailNumber = '';
	    				me.$el.find('dd.email-content').html('<span style="color:#999;font-size:13px;">未注册</span>');
	    	    		me.$el.find('dd.email-manage').html('<a class="register">立即注册</a>');
	    	    		
	    	    		// 邮件绑定未开通
	    	    		me.$el.find('.subscription th').eq(2).html('邮件<span style="color:red;">未开通</span>');
	    	    		me.$el.find('[name="bmi-email"]').removeAttr("checked").hide();
	    			}
	    		});
	    	}
        },
        
        saveSubscription: function(){
        	var check_email = this.$el.find('input[name="bmi-email"]'),
        		check_phone = this.$el.find('input[name="bmi-phone"]');
        	subscription.save({
        		bmiEmailBinding:check_email.attr('checked')?'1':'0',
        		bmiMobileBinding:check_phone.attr('checked')?'1':'0',
				orderIns:this.options.insIdCd
        	},{success: function(){
        		sandbox.emit('bmiRefreshBinding');
        	}});
        },
        
        testContact: function(e){
        	var me = this,
        		target = $(e.target),
        		$dd = target.closest('dd');
        	
        	if($dd.hasClass('phone-manage')){
	        	$.ajax({
	        		type:'get',
	        		url:'info/examination?instId='+me.options.insIdCd
	        			+'&settleDt='+me.options.nowDate+'&type=0',
	        		success: function(res){
	        			if(res == true){
	        				alert('发送成功，请查收短信');
	        			} else if(res == false){
	        				alert('发送失败');
	        			}
	        		},
	        		error: function(){
	        			alert('发送失败');
	        		}
	        	});
        	} else if($dd.hasClass('email-manage')) {
        		$.ajax({
	        		type:'get',
	        		url:'info/examination?instId='+me.options.insIdCd
	        			+'&settleDt='+me.options.nowDate+'&type=1',
	        		success: function(res){
	        			if(res == true){
	        				alert('发送成功，请查收邮件');
	        			} else if(res == false){
	        				alert('发送失败');
	        			}
	        		},
	        		error: function(){
	        			alert('发送失败');
	        		}
	        	});
        	}
        	
        }

    });
    
    return notifyView;
});