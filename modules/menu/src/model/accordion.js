define(function(require, exports, module) {
	"use strict";
	
	var Accordion = Backbone.Model.extend({
	    defaults: {
        	 icon:'',
        	 divId:'',
        	 menuGroupId:'',
        	 menuGroupUrl:'',
        	 menuGroupNm:''
	    },
	    
	    initialize: function(){
        	this.formatData();
        },
        
        formatData: function(){
        	var ftIcon, ftDivId;
        	switch(this.get('menuGroupId')){
        		case 1: 
        			ftIcon = 'tasks';
        			ftDivId = 'dw-tree';
        			break;
        		case 4: 
        			ftIcon = 'search';
        			ftDivId = 'cx-tree';
        			break;
        		case 3: 
        			ftIcon = 'file';
        			ftDivId = 'file-tree';
        			break;
        		case 2: 
        			ftIcon = 'chart';
        			ftDivId = 'kpi-tree';
        			break;
        		case 9: 
        			ftIcon = 'admin';
        			ftDivId = 'admin-tree';
        			break;
        		default:break;
        	}
        	this.set({
        		icon:ftIcon,
        		divId:ftDivId
    		});
        }
	  });
	
	return Accordion;
});