define(function(require, exports, module) {
	"use strict";
	var Server = Backbone.Model.extend({
		defaults: {
	        ip					:   ''
	       ,jmxServerName		:  ''
	       ,jmxSt				:    2
	       ,jmxStDesc			:	''
	        
	       ,smxServerName		:	''
	       ,smxSt				:	2
	       ,smxStDesc			:	''
	        
	       ,listenTaskSt		:	2
	       ,listenTaskStDesc	:	''
	        
	       ,scheduleTaskSt		:	2
	       ,scheduleTaskStDesc	:	''
	        
	       ,othSrvName			:	''
	       ,othSrvSt			:	2
	       ,othSrvStDesc		:	''
	        
	       ,othSrvCmd			:	-1
		}
		,formatData: function(){
        	var _jmxStDesc;
        	if (this.get('jmxSt')==0)         	  _jmxStDesc = '运行中';
                else if (this.get('jmxSt')==-1)   _jmxStDesc = '已停止';
                else 							  _jmxStDesc = '未知';
        	this.set({jmxStDesc:_jmxStDesc});
        	
        	var _smxStDesc;
        	if (this.get('smxSt')==0)         	  _smxStDesc= '运行中';
                else if (this.get('smxSt')==-1)   _smxStDesc= '已停止';
                else 							  _smxStDesc='未知';
        	this.set({smxStDesc:_smxStDesc});
        	
        	var _listenTaskStDesc;
        	if (this.get('listenTaskSt')==0)      		 _listenTaskStDesc= '运行中';
                else if (this.get('listenTaskSt')==-1)   _listenTaskStDesc= '已停止';
                else 									 _listenTaskStDesc= '未知'  ; 
        	this.set({listenTaskStDesc:_listenTaskStDesc});
        	
 	      	var _scheduleTaskStDesc;
        	if (this.get('scheduleTaskSt')==0)       	 _scheduleTaskStDesc= '运行中';
                else if (this.get('scheduleTaskSt')==-1) _scheduleTaskStDesc= '已停止';
                else if (this.get('scheduleTaskSt')==1)  _scheduleTaskStDesc= '其他任务在运行，不能启动';
                else 									 _scheduleTaskStDesc= '未知' ;
        	this.set({scheduleTaskStDesc:_scheduleTaskStDesc});
       	
        	var _othSrvStDesc;
        	if (this.get('othSrvSt')==0)       		_othSrvStDesc= '运行中';
                else if (this.get('othSrvSt')==-1)	_othSrvStDesc= '已停止';
                else 							    _othSrvStDesc= '未知'  ; 
        	this.set({othSrvStDesc:_othSrvStDesc});
        	
        	return this;
		}
	});
	return Server;
});