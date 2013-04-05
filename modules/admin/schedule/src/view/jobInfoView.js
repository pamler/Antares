define(function(require, exports, module) {
    "use strict";
    var jobInfoTpl = require('../../html/jobInfo.tpl'),
       
        JobModView = require("./jobModView"),
        JobCreateView = require("./jobCreateView");

    var Systems = require("../collection/Systems"),
        Funcs = require("../collection/Funcs"),
        Servs = require("../collection/Servs"),
        systems = new Systems,
        funcs = new Funcs,
        servs = new Servs;


    var Jobs = require("../collection/Jobs"),
        jobs = new Jobs();

    var comboxSystemTpl = ['{@each responseData as it}', '<option value=@{it.systemID}>@{it.systemName}</option>', '{@/each}'].join(''),
	    comboxFuncsTpl = ['{@each responseData as it}', '<option value=@{it.funDtlID}>@{it.funDescribe}</option>', '{@/each}'].join(''),
	    comboxServsTpl = ['{@each responseData as it}', '<option value=@{it.svcDtlID}>@{it.svcName}</option>', '{@/each}'].join('');

    var jobInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'job-info row-fluid',

        events: {
            "click #schedule-jobInfo-tab a": "tabChange",
            "change #jobInfo-inputSubSystem": "systemSelect",
            "click .form-actions .submit": "submitForm",
            "click .form-actions .creat": "createJob"
        },
        curJobID: 0,
        systemEl: "",

        initialize: function() {
            var me = this;
            _.bindAll(this, 'render');
            _.bindAll(this, 'renderGrid');
            systems.fetch({
                success: function(collection, response, options) {
                    me.systemEl = juicer(comboxSystemTpl, response);
                    me.$el.find("#jobInfo-inputSubSystem").append(me.systemEl);
                    me.render();
                }
            });
            
            servs.fetch({
	              url:'system/services',
	              success:function(collection, response, options){
	              	  var obj = {};
	              	  obj["responseData"] = response;
	                  
	                  var el = juicer(comboxServsTpl, obj);
	                  $("#jobInfo-inputService").append(el);
	              }
	          });

            $(this.el).html(jobInfoTpl);

        },

        render: function() {


            this.jobCreateView = new JobCreateView();


            this.$el.find("#jobInfo-detail").append(this.jobCreateView.render({
                system: this.systemEl
            }).el);

        },

        systemSelect: function(e) {
	          funcs.fetch({
	          	  url:'system/'+$(e.target).val()+'/funs',
	              success:function(collection, response, options){
	              	  var obj = {};
	              	  obj["responseData"] = response;

	              	  var el = juicer(comboxFuncsTpl, obj);
	                  $("#jobInfo-inputMethod").html('<option value="">全部</option>').append(el);
	              }
	          });
	          
	          servs.fetch({
	              url:'system/'+$(e.target).val()+'/services',
	              success:function(collection, response, options){
	              	  var obj = {};
	              	  obj["responseData"] = response;
	                  
	                  var el = juicer(comboxServsTpl, obj);
	                  $("#jobInfo-inputService").html('<option value="">全部</option>').append(el);
	              }
	          });
        },
        submitForm: function(e) {
        	e.preventDefault();
        	var query = $(e.target).closest('form').serialize();
            $("#list-schedule-jobInfo").jqGrid('setGridParam', {
                url: "jobs?" + query
            }).trigger("reloadGrid", [{
                page: 1
            }]);
        },
        renderGrid: function() {

            var that = this;

            function funcName(cellvalue, options, rowObject) {
                return rowObject['func']['funName'];
            }

            function svcName(cellvalue, options, rowObject) {
                return rowObject['srvc']['svcName'];
            }

            var jobGrid = $("#list-schedule-jobInfo");
            jobGrid.jqGrid({
                datatype: "json",
                colNames: ['JOB_ID', '名称', '子系统', '执行服务', '执行方法'],
                colModel: [{
                    name: 'jobID',
                    index: 'jobID',
                    align: 'center',
                    width: 60
                }, {
                    name: 'jobCnNM',
                    index: 'jobCnNM',
                    align: 'center',
                    width: 150
                }, {
                    name: 'systemName',
                    index: 'systemName',
                    align: 'center',
                    width: 100
                }, {
                    name: 'srvc.svcName',
                    index: 'svcName',
                    width: 120,
                    align: 'center'
                }, {
                    name: 'func.funName',
                    index: 'funName',
                    width: 250,
                    align: 'center'
                }

                ],
                rowNum: 10,
                sortname: 'jobID',
                hidegrid: false,
                viewrecords: true,
                pager: '#pager-schedule-jobInfo',
                sortorder: "desc",
                width:850,
			   	height:280,
                caption: "JOB 结果",
                jsonReader: {
                    root: "data",
                    repeatitems: false
                },
                onSelectRow: function(rowid, status, e) {
                    this.curJobID = jobGrid.jqGrid('getRowData', rowid)['jobID'];
                },
                ondblClickRow: function(rowid, iRow, iCol, e) {
                    this.curJobID = jobGrid.jqGrid('getRowData', rowid)['jobID'];

                    var job = jobs.get(this.curJobID);

                    if (!that.jobModView) {
                        that.jobModView = new JobModView({
                            systemEl: that.systemEl
                        });
                        that.$el.find("#jobInfo-detail").append(that.jobModView.el);
                    }
                    that.jobModView.render(job);
                    that.jobModView.$el.show();
                    that.jobCreateView.$el.hide();

                    that.$el.find('#jobInfo-detail-tab').click();

                },
                loadComplete: function(res) {

                    jobs.reset(res.data);

                }
            }).navGrid('#pager-schedule-jobInfo', {
                edit: false,
                add: false,
                del: false
            });
        },

        createJob: function(e) {
            e.preventDefault();
            this.jobCreateView.$el.find('#jobInfo-create-working-form input').val('');
            this.jobCreateView.$el.show();
            
            if (this.jobModView) {
                this.jobModView.$el.hide();
            }

            this.$el.find('#jobInfo-detail-tab').click();
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

    return jobInfoView;
});