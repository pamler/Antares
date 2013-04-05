define(function(require, exports, module) {
    "use strict";
    var serverInfoTpl = require('../../html/serverInfo.tpl');
    
    var ServerbkInfoView = require('../view/serverbkInfoView');
    
    var ServerModel = require('../model/ServerInfoModel'),
    	server = new ServerModel;
       
    var serverInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'server-info row-fluid',
        template: juicer(serverInfoTpl),
        
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
	            		$(me.el).html(el).find('form').append(new ServerbkInfoView().el);
	            		
	            		if(res.listenTaskSt === 0){
	            			me.$el.find('label[name="listenTaskSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            			me.$el.find('button[name="listenTaskSt"]').text('停止').
	            				removeClass('btn-info').addClass('btn-danger');
	            		} else {
	            			me.$el.find('label[name="listenTaskSt"]').css('color','red').
	            				find('img').attr('src','resources/img/run-stop.png');
	            			me.$el.find('button[name="listenTaskSt"]').text('启动').
	            				removeClass('btn-danger');
	            		}
	            		if(res.scheduleTaskSt === 0){
	            			me.$el.find('label[name="scheduleTaskSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            			me.$el.find('button[name="scheduleTaskSt"]').text('停止').
	            				removeClass('btn-info').addClass('btn-danger');
	            		} else {
	            			me.$el.find('label[name="scheduleTaskSt"]').css('color','red').
	            				find('img').attr('src','resources/img/run-stop.png');
	            			me.$el.find('button[name="scheduleTaskSt"]').text('启动')
	            				.removeClass('btn-danger');
	            		}
	            		if(res.jmxSt === 0){
	            			me.$el.find('label[name="jmxSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            			me.$el.find('button[name="jmxSt"]').text('停止').
	            				removeClass('btn-info').addClass('btn-danger');
	            		} else {
	            			me.$el.find('label[name="jmxSt"]').css('color','red').
	            				find('img').attr('src','resources/img/run-stop.png');
	            			me.$el.find('button[name="jmxSt"]').text('启动')
	            				.removeClass('btn-danger');
	            		}
	            		if(res.smxSt === 0){
	            			me.$el.find('label[name="smxSt"]').css('color','green').
	            				find('img').attr('src','resources/img/run-switch.gif');
	            		} else {
	            			me.$el.find('label[name="smxSt"]').css('color','red').
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
        		case 'memory':
    				$.ajax({url:'server/operation/IMM'});
        			this.$el.find('label[name="memory"]').css('color','green').
        				html('状态：已成功<img src="resources/img/run-success.png">');
        			break;
        		case 'listenTaskSt':
        			if(btnStatus == '启动'){
        				this.sendAJAX(server, 'server/operation/SML');
        			} else if(btnStatus == '停止'){
        				this.sendAJAX(server, 'server/operation/PML');
        			}
        			break;
    			case 'scheduleTaskSt':
        			if(btnStatus == '启动'){
        				this.sendAJAX(server, 'server/operation/SMS');
        			} else if(btnStatus == '停止'){
        				this.sendAJAX(server, 'server/operation/PMS');
        			}
        			break;
    			case 'jmxSt':
        			if(btnStatus == '启动'){
        				this.sendAJAX(server, 'server/operation/SJX');
        			} else if(btnStatus == '停止'){
        				this.sendAJAX(server, 'server/operation/PJX');
        			}
        			break;
    			default: break;
        	}
        },
        
        initialize: function() {
            var me = this;
            _.bindAll(this, 'sendAJAX', 'buttonClick');
            
            this.sendAJAX(server, 'server/operation/QMI');
            
        }

    });

    return serverInfoView;
});