// ## Sandbox Extension
// @fileOverview Extend the aura-sandbox (facade pattern)
// @todo This is a stupid place to include jquery ui
define(function(require, exports, module) {
	"use strict";

	var moduleArr = seajs.config.data.modules; 
	
    return {
	    extend: function(sandbox, channel) {
	        sandbox.mvc = {};
	        var domain;
	        for(var i = 0; i < moduleArr.length; i++){
				if(channel == moduleArr[i].name){
					domain = moduleArr[i].domain;
					break;
				}
			}
	        
	        var customSync = function(method, model, options){
    			if(!domain){
    				// 同域
    				return Backbone.sync.apply(this, arguments);
    			} else if(domain && method == 'read'){
				    // 跨域get
    				options.dataType = 'jsonp';
    				options.url = domain + (options.url ? options.url : _.result(model, 'url'));
    				return Backbone.sync.apply(this, arguments);
				} else {
				    // 跨域非get	
				    return Backbone.sync.apply(this, arguments);
				}
	        }
	        
	        sandbox.mvc.View = function(view) {
	            return Backbone.View.extend(view);
	        };
	
	        sandbox.mvc.Model = function(model) {
	        	return Backbone.Model.extend(_.extend(model, {
	        		sync: customSync
	        	}));
	        };
	
	        sandbox.mvc.Collection = function(collection) {
	        	return Backbone.Collection.extend(_.extend(collection, {
	        		sync: customSync
	        	}));
	        };
	
	        sandbox.mvc.Router = function(router) {
	        	return Backbone.Router.extend(router);
	        };
	
	        return sandbox;
	    }
    };
});
