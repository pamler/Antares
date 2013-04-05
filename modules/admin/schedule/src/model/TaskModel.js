define(function(require, exports, module) {
	"use strict";
	var Task = Backbone.Model.extend({
	    defaults: {
		     describe	:	''
	    	,taskDate	:	''
	    	,taskId		:	-1
	    	,taskName	:	''
	    	,taskPeriod	:	''
	    	,taskTime	:	0  
		}
		,initialize: function(){ }
	  });
	return Task;
});