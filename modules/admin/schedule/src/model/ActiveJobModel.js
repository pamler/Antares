define(function(require, exports, module) {
	"use strict";
	var ActiveJob = Backbone.Model.extend({
	    idAttribute: 'autoId',
	    urlRoot: 'activejob',
	    defaults: {
		     autoId	:	''
	    	,scheduleId	:	''
	    	,taskSt		:	-1
	    	,scheduleTime	:	''
	    	,remain	:	''
	    	,crtTime	:	0
	    	,describe : ''
	    	,schInfo : ''
	    	,current : ''
		}
	});
	
	return ActiveJob;
});
