define(function(require, exports, module) {
    "use strict";
    var tpl = require('../../html/calendar.tpl');
    
    var sandbox = require('sandbox.kpi.fbmi');
    
    var DateInfo = require('../collection/dateInfos'),
   		dateInfo = new DateInfo;
    
    var CalendarView = Backbone.View.extend({
       
    	tagName: "div",
    	className:'month-dialog',
        events: {
			"click .month-panel": "selectDate"
    	},
    	
    	initialize: function(){
    		this.render();
    	},
        
        render: function() {
            var me = this;
            dateInfo.fetch({
            	url:'mainPageInfo/getTime/'+me.options.insIdCd,
            	success:function(collection, response, options){
            		var data = {
		    			list: collection.toJSON()
		    		};
            		var el = juicer(tpl, data);
            		me.$el.html(el);
            		me.nowYear = collection.toJSON()[0].year;
            	}
            });
            
            return this;
        },
        
        selectDate: function(e){
        	var target = $(e.currentTarget);
        	if(!target.hasClass('disable')){
        		var newdate = this.nowYear+target.find('.month-name').text().substr(0,2)+'01';
        		sandbox.emit('bmiRefreshPage', newdate);
        	}
        
        }

    });
    
    return CalendarView;
});