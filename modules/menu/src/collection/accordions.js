define(function(require, exports, module) {
	"use strict";
	
	var Accordion = require("../model/accordion"),
		sandbox = require("sandbox.menu");
	
	var AccordionList = sandbox.mvc.Collection({
	    model: Accordion,
	    url: function(){
	    	return 'menus/groups';
	    }
	});
	
	return AccordionList;
});