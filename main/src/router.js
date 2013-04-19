define(function(require, exports, module) {
	"use strict";
	
	 var core = require('aura_core'),
	 	 perm = require('aura_perm');
	
	 var Router = Backbone.Router.extend({
	      initialize: function() {
	          
	    	  Backbone.history.start();
	      },
	      routes: {
	    	  '': 'index',
	    	  '*router': 'router'
	      },
	      
	      router: function(args) {
	    	  // 匹配以 !/ 开始的链接
	          if(args.match(/^\!\/.*/)){
	        	  var slice = Array.prototype.slice,
	        	  	  event,
	        	  	  route;
	        	  // 判断权限,访问的链接是否是菜单中拥有的
	        	  if(!seajs.config.data.auth_strict || $.inArray(args, perm.getRule()) != -1){
	        		  args = args.substr(2).split('/');   // split by slashes
			          event = slice.call(args,0);
			          
			          event.unshift('route');   // prepend 'route' namespace
			          route = event.join('.');  // join into delimeter format
			          route = [route];          // wrap route in an array
			          // 触发hash相对应的事件
			          core.emit.apply(this, route.concat([args]));
	        	  } else {
	        		  // 跳转到报错页面 
	        		  window.location.href = 'error.html';
	        	  }
	          }
	      },
	      
	      // 首页链接
	      index: function(){
	    	  core.start({
		  	      'home': {
		  		      options: {
	  		              element: '#home-content'
		  		      }
		  		  }
		      });
	    	  // 样式修改
	    	  $('#accordion').accordion({ active: false });
	    	  $('.tree-navi').jstree("deselect_all");
	    	  $('.home-btn').closest('h3').addClass('ui-state-active');
	    	  
	    	  //有标签存在，切换首页，deselect所有tab标签
			  if($("#tab-navi li").length != 0){
				  $(".center-view").tabs('option','collapsible',true);
				  $(".center-view").tabs('option','active',false);
				  
				  $("#tab-navi .icon-remove").addClass('icon-white');
			  }
	    	  $('#app-content').hide();
	    	  $('#home-content').show();
	      }
     });
	 
	 return Router;
});