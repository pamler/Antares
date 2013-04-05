define(function(require, exports, module) {
	"use strict";
	var Service = Backbone.Model.extend({
		defaults: {
	         ip			:	''         
			,password	:   ''
			,port		:   0   
			,svcDescribe:	''
			,svcDtlID	: 	-1  
			,svcName	:  	''  
			,svcPath	:   '' 
			,svcType	:   ''
			,transType	:  	''
			,userName	:   ''
		}
		,initialize: function(){ }
       
	  });
	return Service;
});