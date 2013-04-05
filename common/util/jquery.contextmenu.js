define(function(require, exports, module) {
    "use strict";
    
	var ContextMenu = function (element) {
	    $(element).on('contextmenu.context-menu.data-api', this.show);
		$('html').on('click.context-menu.data-api', clearMenus);
	}
	var clearMenus = function(){
		$('.context-menu').css('display','none').data('e',undefined);
	}
	ContextMenu.prototype = {
		constructor: ContextMenu,
		show: function (e) {
	  		var $this = $(this);
	  		if ($this.is('.disabled, :disabled')){ 
	  			return;
  			}
	 		clearMenus();
		    $($this.data('context-menu')).data('e',e)
			.css('position','fixed').css('left',e.clientX)
			.css('top',e.clientY).css('display','block')      
		    return false;
	    }
	}
	
    $.fn.contextmenu = function (option) {
	    return this.each(function () {
	        var $this = $(this)
	        if (!$this.data('context-menu-obj')){ 
	      		$this.data('context-menu-obj', new ContextMenu(this));
      		}
	    })
  	}
  	$.fn.contextmenu.Constructor = ContextMenu;
});