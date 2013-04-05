define(function(require, exports, module) {
    "use strict";
    
    var cacheInfoTpl = require('../../html/cacheInfo.tpl'),
    	cacheItemTpl = require('../../html/cacheItem.tpl');
    
    var cacheInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'cache-info row-fluid',
        itemTpl: juicer(cacheItemTpl),
        events: {
        	"click h2 span": "refreshCache",
        	"click a.btn": "deleteCache"
        },
        
        initialize: function() {
            var me = this;
            me.$el.html(cacheInfoTpl);
            $.ajax({
            	url:'caches/sndcache/local',
            	dataType:'json',
            	type:'get',
            	success: function(res){
            		var list = {
            			data: res
            		}
            		var el = me.itemTpl.render(list);
            		me.$el.find('[name="local-sndcache"]').html(el);
            	}
            });
            $.ajax({
            	url:'caches/sndcache/remote',
            	dataType:'json',
            	type:'get',
            	success: function(res){
            		var list = {
            			data: res
            		}
            		var el = me.itemTpl.render(list);
            		me.$el.find('[name="remote-sndcache"]').html(el);
            	}
            });
            $.ajax({
            	url:'caches/custcache/local',
            	dataType:'json',
            	type:'get',
            	success: function(res){
            		var list = {
            			data: res
            		}
            		var el = me.itemTpl.render(list);
            		me.$el.find('[name="local-custcache"]').html(el);
            	}
            });
            $.ajax({
            	url:'caches/custcache/remote',
            	dataType:'json',
            	type:'get',
            	success: function(res){
            		var list = {
            			data: res
            		}
            		var el = me.itemTpl.render(list);
            		me.$el.find('[name="remote-custcache"]').html(el);
            	}
            });
        },
        
        refreshCache: function(e){
        	var me = this;
        	var target = $(e.target);
        	
        	switch(target.closest('h2').siblings('div').attr('name')){
        		case 'local-sndcache':
        			$.ajax({
		            	url:'caches/sndcache/local',
		            	dataType:'json',
		            	type:'get',
		            	success: function(res){
		            		var list = {
		            			data: res
		            		}
		            		var el = me.itemTpl.render(list);
		            		me.$el.find('[name="local-sndcache"]').html(el);
		            	}
		            });
        			break;
        		case 'remote-sndcache':
        			$.ajax({
		            	url:'caches/sndcache/remote',
		            	dataType:'json',
		            	type:'get',
		            	success: function(res){
		            		var list = {
		            			data: res
		            		}
		            		var el = me.itemTpl.render(list);
		            		me.$el.find('[name="remote-sndcache"]').html(el);
		            	}
		            });
        			break;
        		case 'local-custcache':
        			$.ajax({
		            	url:'caches/custcache/local',
		            	dataType:'json',
		            	type:'get',
		            	success: function(res){
		            		var list = {
		            			data: res
		            		}
		            		var el = me.itemTpl.render(list);
		            		me.$el.find('[name="local-custcache"]').html(el);
		            	}
		            });
        			break;
        		case 'remote-custcache':
        			$.ajax({
		            	url:'caches/custcache/remote',
		            	dataType:'json',
		            	type:'get',
		            	success: function(res){
		            		var list = {
		            			data: res
		            		}
		            		var el = me.itemTpl.render(list);
		            		me.$el.find('[name="remote-custcache"]').html(el);
		            	}
		            });
        			break;
        		default: break;
        	}
        },
        
        deleteCache: function(e){
        	e.preventDefault();
        	
        	var type = this.$el.find('select').val(),
        		name = this.$el.find('[name="user-input"]').val();
        	$.ajax({
            	url:'caches/evictcache/' + type + '/' + name,
            	dataType:'json',
            	type:'get',
            	success: function(res){
            		if(!res){
            			art.artDialog({
						    content: '删除失败！',
						    opacity:'0.1',
						    icon: 'error'
						}).lock();
            		} else {
            			art.artDialog({
						    content: '删除成功！',
						    opacity:'0.1',
						    icon: 'succeed'
						}).lock();
            		}
            	},
            	error: function(){
            		art.artDialog({
					    content: '删除失败！',
					    opacity:'0.1',
					    icon: 'error'
					}).lock();
            	}
            });
        
        }

    });

    return cacheInfoView;
});