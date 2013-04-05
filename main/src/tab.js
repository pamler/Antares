define(function(require, exports, module) {
	"use strict";
	
	require('contextmenu');
	
	var tabInfo = [],
		tabs = $(".center-view").tabs({
			activate: activateTab
		});
	
	$("#tab-navi li .icon-remove").live("click", removeTab);
	
	exports.createNewSheet = function(nodeId, title){		
		var id ="tab-" + nodeId,
			tabId = nodeId + '-node';
		$("#tab-navi, #app-content").show();
		$("#home-content").hide();

		if(typeof (tabInfo[tabId]) === 'undefined'){
			//新建tab标签
			tabInfo[tabId] = nodeId;
			
			var li = $('<li id="'+nodeId+'" data-context-menu="#tabContextmenu"><a href="#'+id+'" onfocus="this.blur()">'+
				title+'</a> <i class="icon-remove icon-white"></i></li>').contextmenu();
			
			tabs.find(".ui-tabs-nav").append(li);
			
			if($('#'+id).length == 0){
				var appNode = $('<div id="' + id + '"><div id="loading-content"></div></div>');
				tabs.find("#app-content").append(appNode);
			}
			tabs.tabs("refresh");
			tabs.tabs('select', '#'+id);
		} else {
			tabs.tabs('select', '#'+id);
		}
	};
	
	function activateTab(e, ui){
		if(ui.newTab.length != 0){
			tabs.tabs('option','collapsible',false);
			
			var node = '#'+ui.newTab.attr('id'),
				appId = node.split('-')[0],
				accordionId = appId+'-tree-accordion';
			
			// tab标签与accordion联动
			$("#accordion").accordion('activate',accordionId);
			
			// tab标签与左侧tree联动
			$(appId+'-tree').jstree('set_focus').jstree("deselect_all");
			$.jstree._focused().select_node(node+'-node', false);
			ui.newTab.find('i').removeClass('icon-white');
			ui.oldTab.find('i').addClass('icon-white');
		}
	}
	
	function removeTab(){
		var tabId = $( this ).closest( "li" ).attr("id"),
			appId = '#' + tabId.split('-')[0],
			panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		$( "#" + panelId ).hide();
		delete tabInfo[tabId+'-node'];//删除tabInfo保存的相应的tab标签内容

		//防止首页激活时，关闭标签首页内容丢失
		tabs.tabs( "refresh" );
		
		//如果所有标签删除，激活首页
		if($("#tab-navi li").length == 0){
			$("#accordion").accordion({ active: false });
			$("#tab-navi, #app-content").hide();
			$(appId + '-tree').jstree("deselect_all");
			
			location.href = '#';
		}
	}
	
});
	