define(function(require, exports, module) {
	"use strict";
	var Log = Backbone.Model.extend({
		defaults: {
         logId			:	-1
		,preLogId		:	-1
		,rltLogId		:	-1
		,scheduleId		:	-1
		,taskSt			:	''
		,scheduleTime	:	''
		,logCrtTime		:	''
		,describe		:	''
    }
		,initialize: function(){ }
       
	  });
	return Log;
});