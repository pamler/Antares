define(function(require, exports, module) {
    "use strict";
    var jobCreateTpl = require('../../html/jobCreate.tpl');
    var util = require('./util');
    var jobModel = require("../model/Job"),
    	job = new jobModel;
    
    var Func = require("../model/FunModel"),
    	Srvc = require("../model/SvcModel"),
    	funcModel = new Func,
    	svcModel = new Srvc;
    
    var jobCreateView = Backbone.View.extend({
        tagName: 'div',
        className: 'row-fluid',
        originJob: {},
        workingJob: {},

        events: {
            "blur #jobInfo-create-working-form input[name='jobID']": "jobIdChange",
        	"blur #jobInfo-create-working-form select[name='systemID']": "jobIdChange",
            "blur #jobInfo-create-working-form input[name='func[funDtlID]']": "funcIdChange",
            "blur #jobInfo-create-working-form input[name='srvc[svcDtlID]']": "srvcIdChange",
            "click .form-actions .submit-confirm": "showCreate",
            "click .form-actions .clear": "resetForm",
            "click .modal-footer .submit": "createSubmit"
        },

        initialize: function() {
            var me = this;

            _.bindAll(this, 'render');

            this.$el.html(jobCreateTpl);

        },

        render: function(options) {
            this.$el.find("#jobInfo-systemID").append(options.system);
            return this;

        },
        
        createSubmit: function() {

            var newJob = new jobModel();
            util.populate(newJob, this.$el.find("#jobInfo-create-working-form"));

            delete newJob.id;
            
            newJob.save();
            this.$el.find('#jobInfo-createModal').modal('hide');
        },

        showCreate: function(e) {
            e.preventDefault();
            
            util.copyForm(this.$el.find("#jobInfo-create-working-form"), this.$el.find("#jobInfo-create-form"));
            var systemNm = this.$el.find("#jobInfo-create-working-form").find("#jobInfo-systemID option:selected").text();
            this.$el.find("#jobInfo-create-form").find("[name='systemName']").val(systemNm);

            this.$el.find('#jobInfo-createModal').modal();
        },
        
        resetForm: function(e){
        	e.preventDefault();
        	
        	this.$el.find('#jobInfo-create-working-form input').val('');
        },
        
        jobIdChange: function(e){
        	var target = $(e.target);
        	
    		var sysId = this.$el.find('[name="systemID"]').val(),
    			jobId = this.$el.find('[name="jobID"]').val();
        	job.fetch({
        		url:'job/'+sysId+'_'+jobId,
        		success:function(model, response, options){
        			if(response.jobID){
	        			$('#jobInfo-create-working-form').populate(response,{identifier:'name'});
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
        
        funcIdChange: function(e){
        	var target = $(e.target);
        	funcModel.fetch({
        		url:'job/func/'+target.val(),
        		success:function(model, response, options){
        			if(response.funDtlID != 0){
	        			var obj = {};
	        			obj.func = response;
	        			
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
        
        srvcIdChange: function(e){
        	var target = $(e.target);
        	svcModel.fetch({
        		url:'job/service/'+target.val(),
        		success:function(model, response, options){
        			if(response.svcDtlID != 0){
	        			var obj = {};
	        			obj.srvc = response;
	        			
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
        }

    });

    return jobCreateView;
});