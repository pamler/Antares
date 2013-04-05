define(function(require, exports, module) {
    "use strict";
    var planDetailTpl = require('../../html/planCreate.tpl');
    var util = require('./util');
    var planModel = require("../model/Plan"),
    	jobModel = require("../model/Job"),
    	taskModel = require("../model/TaskModel"),
        
        plan = new planModel(),
    	task = new taskModel,
    	job = new jobModel;
    
    var planCreateView = Backbone.View.extend({
        tagName: 'div',
        className: 'row-fluid',
        originPlan: {},

        events: {
            "click .form-actions .submit-confirm": "showCreate",
            "click .modal-footer .submit": "createSubmit",
            "blur #planInfo-create-working-form input[name='scheduleId']": "scheduleIdChange",
            "blur #planInfo-create-working-form input[name='task[taskId]']": "taskIdChange",
            "blur #planInfo-create-working-form select[name='job[systemID]']": "jobIdChange",
            "blur #planInfo-create-working-form input[name='job[jobID]']": "jobIdChange"
        },
        
        initialize: function(options) {
            var me = this;

            _.bindAll(this, 'render');

            this.$el.html(planDetailTpl);

            this.$el.find("#planInfo-create-working-form [name='job[systemID]']").append(options.systemEl);

            this.$el.find("#planInfo-startDate").datepicker({
                dateFormat: "yymdd",
                onSelect: function(selectedDate) {
                    $("#planInfo-endDate").datepicker("option", "minDate", selectedDate);
                }
            });
            this.$el.find("#planInfo-endDate").datepicker({
                dateFormat: "yymmdd",
                maxDate: 0,
                onSelect: function(selectedDate) {
                    $("#planInfo-startDate").datepicker("option", "maxDate", selectedDate);
                }
            });


        },

        render: function(options) {
            return this;
        },
        
        scheduleIdChange: function(e){
        	var target = $(e.target),
        		scheduleId = target.val();
        	
        	plan.fetch({
        		url:'schedule/'+scheduleId,
        		success:function(model, response, options){
        			if(response.scheduleId){
	        			$('#planInfo-create-working-form').populate(response,{identifier:'name'});
        			} else {
        				target.closest('form').find('input').each(function(index){
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
        	
        	task.fetch({
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
        	
        	job.fetch({
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

        createSubmit: function() {
            var newPlan = new planModel;
            
            util.populate(newPlan, this.$el.find("#planInfo-create-working-form"));
            delete newPlan.id;
			newPlan.save();
            this.$el.find('#planInfo-createModal').modal('hide');
        },

        showCreate: function(e) {
            e.preventDefault();
            
            util.copyForm(this.$el.find("#planInfo-create-working-form"), this.$el.find("#planInfo-create-form"));
            var systemNm = this.$el.find("#planInfo-create-working-form").find("#planInfo-systemID option:selected").text();
            this.$el.find("#planInfo-create-form").find("#planInfo-systemName").val(systemNm);
            this.$el.find('#planInfo-createModal').modal();
        }

    });

    return planCreateView;
});