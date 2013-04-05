define(function(require, exports, module) {
    "use strict";
    var planInfoTpl = require('../../html/planInfo.tpl'),

        PlanModView = require("./planModView"),
        PlanCreateView = require("./planCreateView");

    var Systems = require("../collection/Systems"),
        Funcs = require("../collection/Funcs"),
        Servs = require("../collection/Servs"),
        systems = new Systems(),
        funcs = new Funcs(),
        servs = new Servs();


    var Plans = require("../collection/Plans"),
        plans = new Plans();

    var comboxSystemTpl = ['{@each responseData as it}', '<option value=@{it.systemID}>@{it.systemName}</option>', '{@/each}'].join(''),
	    comboxFuncsTpl = ['{@each responseData as it}', '<option value=@{it.funDtlID}>@{it.funDescribe}</option>', '{@/each}'].join(''),
	    comboxServsTpl = ['{@each responseData as it}', '<option value=@{it.svcDtlID}>@{it.svcName}</option>', '{@/each}'].join('');

    var planInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'plan-info row-fluid',

        events: {
            "click #schedule-planInfo-tab a": "tabChange",
            "change #planInfo-inputSubSystem": "systemSelect",
            "click .form-actions .submit": "searchPlan",
            "click .form-actions .create": "createPlan"
        },
      
        systemEl: "",

        initialize: function() {
            var me = this;
            _.bindAll(this, 'render', 'renderGrid');
            
            systems.fetch({
                success: function(collection, response, options) {
                    me.systemEl = juicer(comboxSystemTpl, response);
                    me.$el.find("#planInfo-inputSubSystem").append(me.systemEl);
                    me.render();
                }
            });
            
            servs.fetch({
	              url:'system/services',
	              success:function(collection, response, options){
	              	  var obj = {};
	              	  obj["responseData"] = response;
	                  var el = juicer(comboxServsTpl, obj);
	                  $("#planInfo-inputService").append(el);
	              }
	          });

            $(this.el).html(planInfoTpl);

        },

        render: function() {
            this.planCreateView = new PlanCreateView({
                systemEl: this.systemEl
            });

            this.$el.find("#planInfo-detail").append(this.planCreateView.render().el);
			
            //接受运行监控传递过来的scheduleId
			if(this.options.scheduleId){
				this.reviewPlan(this.options.scheduleId);
			}
        },
        
        reviewPlan: function(scheduleId){
        	var me = this;
        	if (!this.planModView) {
	            this.planModView = new PlanModView({
	                systemEl: this.systemEl
	            });
	            this.$el.find("#planInfo-detail").append(this.planModView.el);
	        }
	        this.planModView.$el.show();
	        this.planCreateView.$el.hide();
			
	        //滑动卡延迟100ms滑动，否则容易卡住
	        setTimeout(function(){
	        	me.$el.find('#planInfo-detail-tab').click();
	        },100);
	        this.planModView.review(scheduleId);
        },

        systemSelect: function(e) {
			funcs.fetch({
	          	  url:'system/'+$(e.target).val()+'/funs',
	              success:function(collection, response, options){
	              	  var obj = {};
	              	  obj["responseData"] = response;

	              	  var el = juicer(comboxFuncsTpl, obj);
	                  $("#planInfo-inputMethod").html('<option value="">全部</option>').append(el);
	              }
	          });
	          
	          servs.fetch({
	              url:'system/'+$(e.target).val()+'/services',
	              success:function(collection, response, options){
	              	  var obj = {};
	              	  obj["responseData"] = response;
	                  
	                  var el = juicer(comboxServsTpl, obj);
	                  $("#planInfo-inputService").html('<option value="">全部</option>').append(el);
	              }
	          });
        },
        
        searchPlan: function(e) {
            e.preventDefault();
            
            var query = $(e.target).closest('form').serialize();
            $("#list-schedule-planInfo").jqGrid('setGridParam', {
                url: "schedules?" + query
            }).trigger("reloadGrid", [{
                page: 1
            }]);
        },
        renderGrid: function() {
            var that = this;
            
            var planGrid = $("#list-schedule-planInfo");
            planGrid.jqGrid({
                datatype: "json",
                colNames: ['调度计划ID', '子系统', '任务名称', '有效开始时间', '有效结束时间', '重试次数', '超时分钟', '运行条件', '运行周期'],
                colModel: [{
                    name: 'scheduleId',
                    index: 'scheduleId',
                    align: 'center'
                }, {
                    name: 'job.systemName',
                    index: 'systemName',
                    align: 'center'
                }, {
                    name: 'job.jobCnNM',
                    index: 'jobCnNM',
                    align: 'center'
                }, {
                    name: 'startDate',
                    index: 'startDate',
                    align: 'center'
                }, {
                    name: 'endDate',
                    index: 'endDate',
                    align: 'center'
                }, {
                    name: 'retry',
                    index: 'retry',
                    align: 'center'
                }, {
                    name: 'timeout',
                    index: 'timeout',
                    align: 'center'
                }, {
                    name: 'condition',
                    index: 'condition',
                    align: 'center'
                }, {
                    name: 'task.describe',
                    index: 'describe',
                    align: 'center'
                }],
                rowNum: 10,
                sortname: 'planID',
                hidegrid: false,
                viewrecords: true,
                width:900,
                height:280,
                pager: '#pager-schedule-planInfo',
                sortorder: "desc",
                caption: "计划结果",
                jsonReader: {
                    root: "data",
                    repeatitems: false
                },
                onSelectRow: function(rowid, status, e) {
                    this.curPlanID = planGrid.jqGrid('getRowData', rowid)['scheduleId'];
                },
                ondblClickRow: function(rowid, iRow, iCol, e) {
                    this.curPlanID = planGrid.jqGrid('getRowData', rowid)['scheduleId'];
                    var plan = plans.get(this.curPlanID);

                    if (!that.planModView) {
                        that.planModView = new PlanModView({
                            systemEl: that.systemEl
                        });
                        that.$el.find("#planInfo-detail").append(that.planModView.el);
                    }
                    that.planModView.render(plan);
                    that.planModView.$el.show();
                    that.planCreateView.$el.hide();

                    that.$el.find('#planInfo-detail-tab').click();

                },
                loadComplete: function(res) {
                    plans.reset(res.data);
                }
            }).navGrid('#pager-schedule-planInfo', {
                edit: false,
                add: false,
                del: false
            });
        },
        
        createPlan: function(e) {
            e.preventDefault();
            
            this.planCreateView.$el.show();
            if (this.planModView) {
                this.planModView.$el.hide();
            }

            this.$el.find('#planInfo-detail-tab').click();
        },

        tabChange: function(e) {
            e.preventDefault();
	    	var target = $(e.target);
	    	if(!target.closest('li').hasClass('active')){
	  			target.tab('show');
	  			
	  			var slider = $(this.el).find('.slider');
	
	  			slider.animate({
	  				left: target.position().left - 10
	  			},"normal");
  			}
        }

    });

    return planInfoView;
});