define(function(require, exports, module) {
	"use strict";
	
	var sandbox = require('sandbox.home'),
		perm = require('aura_perm');
	
	var mainTpl = require('../../html/content.tpl');
	
	var AppView = require('./applet');
	
	var MainView = Backbone.View.extend({
		
		className: 'row-fluid home-page',
		
		initialize: function() {
			
			this.render();
	    },
	
		render: function(){
			this.$el.html(mainTpl);
			var appList = perm.getApp();
			
			for(var i=0; i < appList.length; i++){
	    		if(appList[i]!=9){
		    		var appItem = this.$el.find('.app-content').append(
			    		new AppView({
			    			appId: appList[i]
		    			}).el);
    			}
	    	}
		}
	});
	
	return MainView;
});
