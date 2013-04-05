define(function(require, exports, module) {
    "use strict";
    var planDetailTpl = require('../../html/planMod.tpl');
    var util = require('./util');
    var planModel = require("../model/Plan"),
    	jobModel = require("../model/Job"),
    	taskModel = require("../model/TaskModel"),
        
        newPlan = new planModel(),
    	newTask = new taskModel,
    	newJob = new jobModel;

    var planModView = Backbone.View.extend({
        tagName: 'div',
        className: 'row-fluid',
        originPlan: {},

        events: {
            "click .form-actions .submit-confirm": "showMod",
            "click .form-actions .log": "showLog",
            "click .form-actions .mannual": "runLog",
            "click .modal-footer .submit": "modSubmit",
            "blur #planInfo-mod-working-form input[name='scheduleId']": "scheduleIdChange",
            "blur #planInfo-mod-working-form input[name='task[taskId]']": "taskIdChange",
            "blur #planInfo-mod-working-form select[name='job[systemID]']": "jobIdChange",
            "blur #planInfo-mod-working-form input[name='job[jobID]']": "jobIdChange"
        },
        
        initialize: function(options) {
            var me = this;

            _.bindAll(this, 'render');

            this.$el.html(planDetailTpl);
            this.$el.find("#planInfo-mod-working-form [name='job[systemID]']").append(options.systemEl);

            this.$el.find("#planInfo-startDateMod").datepicker({
                dateFormat: "yymdd",
                changeMonth: true,
    	        changeYear: true,
                onSelect: function(selectedDate) {
                    $("#planInfo-endDateMod").datepicker("option", "minDate", selectedDate);
                }
            });
            this.$el.find("#planInfo-endDateMod").datepicker({
                dateFormat: "yymmdd",
                changeMonth: true,
    	        changeYear: true,
                maxDate: 0,
                onSelect: function(selectedDate) {
                    $("#planInfo-startDateMod").datepicker("option", "maxDate", selectedDate);
                }
            });
            
            this.$el.find('[name="scheduleRunTime"]').datepicker({
                dateFormat: "yy-mm-dd",
                changeMonth: true,
    	        changeYear: true
            });
            
            this.popGrid = this.$el.find("#list-schedule-planInfo-dialog");
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

        render: function(plan) {
            if (plan) {
                this.originPlan = plan;
                this.$el.find('form').populate(plan.toJSON());
            } else {
            	
            }
            return this;
        },
        
        review: function(scheduleId){
        	newPlan.fetch({
        		url:'schedule/'+scheduleId,
        		success:function(model, response, options){
        			if(response.scheduleId){
	        			$('#planInfo-mod-working-form').populate(response,{identifier:'name'});
        			} else {
        				target.closest('div.group').find('input').each(function(index){
        					if(index != 0){
        						$(this).val('');
        					}
        				});
        			}
        		}
        	});
        },
        
        scheduleIdChange: function(e){
        	var target = $(e.target),
        		scheduleId = target.val();
        	
        	newPlan.fetch({
        		url:'schedule/'+scheduleId,
        		success:function(model, response, options){
        			if(response.scheduleId){
	        			$('#planInfo-create-working-form').populate(response,{identifier:'name'});
        			} else {
        				target.closest('div.group').find('input').each(function(index){
        					if(index != 0){
        						$(this).val('');
        					}
        				});
        			}
        		}
        	});
        },
        
        taskIdChange: function(e){
        	var target = $(e.target),
        		taskId = target.val();
        	
        	newTask.fetch({
        		url:'task/'+taskId,
        		success:function(model, response, options){
        			if(response.taskId){
	        			var obj = {};
	        			obj.task = response;
	        			target.closest('div.group').populate(obj,{identifier:'name'});
        			} else {
        				target.closest('div.group').find('input').each(function(index){
        					if(index != 0){
        						$(this).val('');
        					}
        				});
        			}
        		}
        	});
        
        },
        
        jobIdChange: function(e) {
        	var target = $(e.target);
        	
        	var sysId = this.$el.find('[name="job[systemID]"]').val(),
        		jobId = this.$el.find('[name="job[jobID]"]').val();
        	
        	newJob.fetch({
        		url:'job/'+sysId+'_'+jobId,
        		success:function(model, response, options){
        			if(response.jobID){
	        			var obj = {};
	        			obj.job = response;
	        			target.closest('div.group').populate(obj,{identifier:'name'});
        			} else {
        				target.closest('div.group').find('input').each(function(index){
        					if(index != 0){
        						$(this).val('');
        					}
        				});
        			}
        		}
        	});
        },
        
        showLog: function(e){
        	e.preventDefault();
        	
        	var me = this;
            me.popGrid.jqGrid('setGridParam', {
                url: 'schedulelogs?scheduleId=' + 
                	$('#planInfo-mod-working-form').find('[name="scheduleId"]').val()
            }).trigger("reloadGrid", [{
                page: 1
            }]);
            
        	var dialog = art.artDialog({
			    title: '详细日志',
			    content: $('#planInfo-logState')[0],
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
        },
        
        runLog: function(e){
        	e.preventDefault();
        	
        	var me = this;
        	var dialog = art.artDialog({
			    title: '调度计划手工运行',
			    content: $('#planInfo-runTime')[0],
			    width: 300,
			    height:100,
			    padding: 0,
			    opacity:'0.1',
			    button: [{
			    	name: '运行',
		            callback: function () {
		            	$.ajax({
		            		type:'get',
		            		url:'activejob/jobstart?scheduleId='+
		            			$('#planInfo-mod-working-form').find('[name="scheduleId"]').val()+
		            			'&scheduleTime='+
		            			$('#planInfo-runTime input').val(),
		            		success: function(){
	            				art.artDialog({
								    icon: 'succeed',
								    content: '已经提交运行，请查询运行日志',
								    opacity:'0.1'
								}).lock();
		            		}
		            	});
		            },
		            focus: true
		        }]
			}).lock();
        },

        showMod: function(e) {
            e.preventDefault();
            this.$el.find('#planInfo-modModal input').removeClass('highlight');
            
            util.copyForm(this.$el.find("#planInfo-mod-working-form"), this.$el.find("#planInfo-mod-form"));
            util.compareForm(this.$el.find("#planInfo-mod-form"), this.$el.find("#planInfo-origin-form"));
            this.$el.find('#planInfo-modModal').modal();
        },

        modSubmit: function() {
            var modPlan = new planModel;
            
            util.populate(modPlan, this.$el.find("#planInfo-mod-working-form"));
            modPlan.save();
            this.$el.find('#planInfo-modModal').modal('hide');
        }

    });

    return planModView;
});