define(function(require, exports, module) {
    "use strict";
	
    var logInfoTpl = require('../../html/schLogInfo.tpl');
    
    var SchModView = require('../view/schModView');
    
    var Systems = require("../collection/Systems"),
        Servs = require("../collection/Servs"),
        Funcs = require("../collection/Funcs"),
        systems = new Systems(),
        servs = new Servs(),
        funcs = new Funcs;
        
    var ActiveJobs = require("../collection/ActiveJobs"),
        activeJobs = new ActiveJobs();
        
    var comboxSystemTpl = ['{@each responseData as it}', '<option value=@{it.systemID}>@{it.systemName}</option>', '{@/each}'].join(''),
        comboxFuncsTpl = ['{@each responseData as it}', '<option value=@{it.funDtlID}>@{it.funDescribe}</option>', '{@/each}'].join(''),
        comboxServsTpl = ['{@each responseData as it}', '<option value=@{it.svcDtlID}>@{it.svcName}</option>', '{@/each}'].join('');
    
    var logInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'log-info row-fluid',
        
        events: {
            "click .form-actions .submit": "submitForm",
            "change #logInfo-systemId": "systemSelect",
            "click #schedule-logInfo-tab a": "tabChange"
        },

        initialize: function() {
            var me = this;
            _.bindAll(this, 'render', 'renderGrid');
            
            $(this.el).html(logInfoTpl);
            
            systems.fetch({
                success: function(collection, response, options) {
                    me.systemEl = juicer(comboxSystemTpl, response);
                    me.$el.find("#logInfo-systemId").append(me.systemEl);
                    me.render();
                }
            });
            
            servs.fetch({
                url:'system/services',
                success:function(collection, response, options){
              	    var obj = {};
              	    obj["responseData"] = response;
                    var el = juicer(comboxServsTpl, obj);
                    $("#logInfo-svcDtlId").append(el);
                }
            });
            
            
            var zeroize = function (value, length) {  
				if (!length) {  
					length = 2;  
				}  
				value = new String(value);  
				for (var i = 0, zeros = ''; i < (length - value.length); i++) {  
					zeros += '0';  
				}  
				return zeros + value;  
			};  
            //获取今日日期
            var date = new Date();
            this.$el.find("#logInfo-startDt").datepicker({
                dateFormat: "yymmdd",
                changeMonth: true,
    	        changeYear: true
            }).val(date.getFullYear()+zeroize(date.getMonth()+1)+zeroize(date.getDate()));
            //获取明日日期
            date.setDate(date.getDate()+1);
            this.$el.find("#logInfo-endDt").datepicker({
                dateFormat: "yymmdd",
                changeMonth: true,
    	        changeYear: true
            }).val(date.getFullYear()+zeroize(date.getMonth()+1)+zeroize(date.getDate()));

        },
        
        render: function() {
            this.schModView = new SchModView;

            this.$el.find("#logInfo-detail").append(this.schModView.render().el);
        },
        
        systemSelect: function(e){
        	funcs.fetch({
	          	  url:'system/'+$(e.target).val()+'/funs',
	              success:function(collection, response, options){
	              	  var obj = {};
	              	  obj["responseData"] = response;

	              	  var el = juicer(comboxFuncsTpl, obj);
	                  $("#logInfo-jobId").html('<option value="">全部</option>').append(el);
	              }
	          });
        	
        	servs.fetch({
		          url:'system/'+$(e.target).val()+'/services',
		          success:function(collection, response, options){
		          	  var obj = {};
		          	  obj["responseData"] = response;
		              
		              var el = juicer(comboxServsTpl, obj);
		              $("#logInfo-svcDtlId").html('<option value="">全部</option>').append(el);
		          }
	        });
        },

        renderGrid: function() {

            var that = this;

            function jobCnNM(cellvalue, options, rowObject) {
                return rowObject['schInfo']['job']['jobCnNM'];
            }

            function funName(cellvalue, options, rowObject) {
                return rowObject['schInfo']['job']['func']['funName'];
            }
            
            function condition(cellvalue, options, rowObject) {
                return rowObject['schInfo']['condition'];
            }

            var logInfoGrid = $("#list-schedule-logInfo");
            logInfoGrid.jqGrid({
                datatype: "json",
                colNames: ['autoId', '当日任务', '任务状态', '调度计划ID', '调度时间', '任务名称', '方法名称', '运行条件'],
                colModel: [{
                	name: 'autoId',
                    index: 'autoId',
                    hidden: true
                },{
                    name: 'current',
                    index: 'current',
                    align: 'center',
                    width: 50
                }, {
                    name: 'taskSt',
                    index: 'taskSt',
                    align: 'center',
                    width: 50
                }, {
                    name: 'scheduleId',
                    index: 'scheduleId',
                    align: 'center',
                    width: 70
                }, {
                    name: 'scheduleTime',
                    index: 'scheduleTime',
                    align: 'center',
                    width: 100
                }, {
                    name: 'schInfo.job.jobCnNM',
                    index: 'jobCnNM',
                    align: 'center',
                    width: 120
                }, {
                	name: 'schInfo.job.func.funName',
                    index: 'funName',
                    align: 'center',
                    width: 120
                }, {
                    name: 'schInfo.condition',
                    index: 'condition',
                    align: 'center',
                    width: 200
                }],
                rowNum: 10,
                width:850,
                height:280,
                sortname: 'scheduleTime',
                sortorder: 'desc',
                hidegrid: false,
                viewrecords: true,
                pager: '#pager-schedule-logInfo',
                caption: "当前任务监控",
                jsonReader: {
                    root: "data",
                    repeatitems: false,
                    id:'0'
                },
                ondblClickRow: function(rowid, iRow, iCol, e) {
                    var activeJob = activeJobs.get(rowid);
                    that.schModView.render(activeJob);
                    that.$el.find('#logInfo-detail-tab').click();
                },
                loadComplete: function(res) {
					activeJobs.reset(res.data);
                }
            }).navGrid('#pager-schedule-logInfo', {
                edit: false,
                add: false,
                del: false
            });
        },
        
        submitForm: function(e){
        	e.preventDefault();
        	
        	var query = $(e.target).closest('form').serialize();
            $("#list-schedule-logInfo").jqGrid('setGridParam', {
                url: "activejobs?" + query
            }).trigger("reloadGrid", [{
                page: 1
            }]);
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

    return logInfoView;
});