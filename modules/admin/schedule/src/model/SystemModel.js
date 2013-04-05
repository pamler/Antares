define(function(require, exports, module) {
	"use strict";
	var System = Backbone.Model.extend({
		defaults: {
	         systemName		:	''
	    	,systemID			:	''
   		}
		,initialize: function(){ }
       
	  });
	return System;
});