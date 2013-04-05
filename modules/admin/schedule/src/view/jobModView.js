define(function(require, exports, module) {
    "use strict";
    var jobModTpl = require('../../html/jobMod.tpl');

    var util = require('./util');
    
    var Func = require("../model/FunModel"),
    	Srvc = require("../model/SvcModel"),
    	Job = require("../model/Job"),
    	funcModel = new Func,
    	svcModel = new Srvc;

    var jobModView = Backbone.View.extend({
        tagName: 'div',
        className: 'row-fluid',
        originJob: {},

        events: {
            "blur input[name='func[funDtlID]']": "funcIdChange",
            "blur input[name='srvc[svcDtlID]']": "srvcIdChange",
            "click .modal-footer .submit": "modSubmit",
            "click .form-actions .submit-confirm": "showMod"
        },


        showMod: function(e) {
			e.preventDefault();

            util.copyForm(this.$el.find("#jobInfo-mod-working-form"), this.$el.find("#jobInfo-mod-form"));

            util.compareForm(this.$el.find("#jobInfo-mod-form"), this.$el.find("#jobInfo-origin-form"));

            this.$el.find('#jobInfo-modModal').modal();
        },
        
        initialize: function(options) {
            var me = this;

            _.bindAll(this, 'render');

            this.$el.html(jobModTpl);
			this.$el.find("#jobInfo-mod-working-form [name='systemID']").append(options.systemEl);
			
            this.render();
        },

        render: function(job) {
            if (job) {
                this.originJob = job;
                this.$el.find('form').populate(job.toJSON());

            }

            return this;

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
        	
        },

        modSubmit: function() {
        	var modJob = new Job;
        	
            util.populate(modJob,this.$el.find("#jobInfo-mod-working-form"));
            modJob.save();
            this.$el.find('#jobInfo-modModal').modal('hide');
        }

    });

    return jobModView;
});