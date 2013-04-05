define(function(require, exports, module) {
    "use strict";
    var core = require('aura_core');
    var schLogModTpl = require('../../html/schLogMod.tpl');
    
    var ActiveJob = require('../model/ActiveJobModel');

    var schModView = Backbone.View.extend({
        tagName: 'div',
        className: 'row-fluid',
        originActiveJob: {},

        events: {
            "click .form-actions .mod-status": "statusMod",
            "click .form-actions .log-detail": "showLog",
            "click .form-actions .plan-detail": "showPlan"
        },
        
        initialize: function(options) {
            var me = this;

            _.bindAll(this, 'render');

            this.$el.html(schLogModTpl);
            
            this.popGrid = this.$el.find("#list-schedule-schLog-dialog");
            this.popGrid.jqGrid({
                datatype: "json",
                colNames: ['log_ID', '任务状态', '调度时间', '运行时间', '描述'],
                colModel: [{
                    name: 'logId',
                    index: 'logId',
                    width: 100
                }, {
                    name: 'taskSt',
                    index: 'taskSt',
                    width: 100
                }, {
                    name: 'scheduleTime',
                    index: 'scheduleTime',
                    width: 100
                }, {
                    name: 'logCrtTime',
                    index: 'logCrtTime',
                    width: 100
                }, {
                    name: 'describe',
                    index: 'describe',
                    width: 200
                }],
                rowNum: 15,
                sortname: 'logId',
                hidegrid: false,
                viewrecords: true,
                sortorder: "desc",
                width:600,
			   	height:250,
                jsonReader: {
                    repeatitems: false,
                    root:"data"
                }
            });
            
            this.render();
        },

        render: function(activeJob) {
            if (activeJob) {
            	this.originActiveJob = activeJob;
                this.$el.find('form').populate(activeJob.toJSON());
            } 
            return this;
        },
        
        statusMod: function(e){
        	e.preventDefault();
        	if(!$.isEmptyObject(this.originActiveJob)){
	        	var newActiveJob = new ActiveJob;
	        	newActiveJob = this.originActiveJob;
	            newActiveJob.save({
	            	taskSt: this.$el.find('[name="taskSt"]').val(),
	        		remain: this.$el.find('[name="remain"]').val()
	            },{
	            	success: function(model, response, options){
	            		art.artDialog({
						    content: '修改成功',
						    icon: 'succeed',
						    opacity:'0.1'
						}).lock();
	            	}
	            });
            }
        },
        
        showPlan: function(e){
        	e.preventDefault();
        	if(!$.isEmptyObject(this.originActiveJob)){
        		core.emit('route.admin.schedule.schInfo',['admin','schedule','schInfo',this.originActiveJob.get('scheduleId')]);
        	}
        	
        },
        
        showLog: function(e){
        	e.preventDefault();
        	
        	var me = this;
        	me.popGrid.jqGrid('setGridParam', {
                url: 'schedulelogs?rltLogId=' + me.originActiveJob.get('autoId')
            }).trigger("reloadGrid", [{
                page: 1
            }]);
            
        	art.artDialog({
			    title: '详细日志',
			    content: $('#schLog-logState')[0],
			    width: 620,
			    height:270,
			    padding: 0,
			    opacity:'0.1',
			    button: [{
		            name: '刷新',
		            callback: function () {
		                me.popGrid.trigger("reloadGrid");
		                return false;
		            },
		            focus: true
		        }]
			}).lock();
        }
        
    });

    return schModView;
});