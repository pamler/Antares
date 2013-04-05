define(function(require, exports, module) {
	"use strict";
	
	var LabelModel = Backbone.Model.extend({
	    defaults: {
	    	labelId: '',
			labelNm: '',
    		labelTimes: 0
	    }
	   
	  });
	return LabelModel;
});