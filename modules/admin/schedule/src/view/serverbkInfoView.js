define(function(require, exports, module) {
    "use strict";
    var serverbkInfoTpl = require('../../html/serverbkInfo.tpl');
    
    var ServerModel = require('../model/ServerInfoModel'),
    	server = new ServerModel;
       
    var serverbkInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'group',
        template: juicer(serverbkInfoTpl),
        
        events: {
            "click button": "buttonClick"
        },
        
        sendAJAX: function(m, url){
        	var me = this;
        	
        	if(url){
        		m.url = url;
	        	m.fetch({
					success:function(model, res){
						var el = me.template.render(model.formatData().toJSON());
	            		$(me.el).html(el);
	            		
	            		if(res.listenTaskSt === 0){
	            			me.$el.find('label[name="bk-listenTaskSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            			me.$el.find('button[name="bk-listenTaskSt"]').text('停止').
	            				removeClass('btn-info').addClass('btn-danger');
	            		} else {
	            			me.$el.find('label[name="bk-listenTaskSt"]').css('color','red').
	            				find('img').attr('src','resources/img/run-stop.png');
	            			me.$el.find('button[name="bk-listenTaskSt"]').text('启动').
	            				removeClass('btn-danger');
	            		}
	            		if(res.scheduleTaskSt === 0){
	            			me.$el.find('label[name="bk-scheduleTaskSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            			me.$el.find('button[name="bk-scheduleTaskSt"]').text('停止').
	            				removeClass('btn-info').addClass('btn-danger');
	            		} else {
	            			me.$el.find('label[name="bk-scheduleTaskSt"]').css('color','red').
	            				find('img').attr('src','resources/img/run-stop.png');
	            			me.$el.find('button[name="bk-scheduleTaskSt"]').text('启动')
	            				.removeClass('btn-danger');
	            		}
	            		if(res.jmxSt === 0){
	            			me.$el.find('label[name="bk-jmxSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            		} else {
	            			me.$el.find('label[name="bk-jmxSt"]').css('color','red').
	            				find('img').attr('src','resources/img/run-stop.png');
	            		}
	            		if(res.smxSt === 0){
	            			me.$el.find('label[name="bk-smxSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            		} else {
	            			me.$el.find('label[name="bk-smxSt"]').css('color','red').
	            				find('img').attr('src','resources/img/run-stop.png');
	            		}
					}
				});
        	}
        },
        
        buttonClick: function(e){
        	e.preventDefault();
        	
        	var target = $(e.target),
        		btnName = target.get(0).name,
        		btnStatus = target.text();
        	switch(btnName){
        		case 'bk-memory':
    				$.ajax({url:'server/operation/IBM'});
        			this.$el.find('label[name="bk-memory"]').css('color','green').
        				html('状态：已成功<img src="resources/img/run-success.png">');
        			break;
        		case 'bk-listenTaskSt':
        			if(btnStatus == '启动'){
        				this.sendAJAX(server, 'server/operation/SBI');
        			} else if(btnStatus == '停止'){
        				this.sendAJAX(server, 'server/operation/PBL');
        			}
        			break;
    			case 'bk-scheduleTaskSt':
        			if(btnStatus == '启动'){
        				this.sendAJAX(server, 'server/operation/SBS');
        			} else if(btnStatus == '停止'){
        				this.sendAJAX(server, 'server/operation/PBS');
        			}
        			break;
    			default: break;
        	}
        },
        
        initialize: function() {
            var me = this;
            _.bindAll(this, 'sendAJAX', 'buttonClick');
            
            this.sendAJAX(server, 'server/operation/QBI');
        }

    });

    return serverbkInfoView;
});