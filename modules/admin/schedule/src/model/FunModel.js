define(function(require, exports, module) {
	"use strict";
	var Func = Backbone.Model.extend({
		defaults: {
	         funDescribe		:	''
	    	,funDtlID			:	-1
	    	,funName			:	''
	    	,funParameter		:	''
	    	,funPath			:	''
	    	,funType			:	''
	    	,logPath			:	''
   		}
		,initialize: function(){ }
       
	  });
	return Func;
});