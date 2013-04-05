define(function(require, exports, module) {
    "use strict";

    var TotalInfo = Backbone.Model.extend({
        defaults: {
        	acqIntnlOrgCd: "",
        	acqIntnlOrgNm:"",
        	date: "",
        	vRlist:[]
        },
        
        initialize: function(){
        	this.formatData();
        },
        
        formatData: function(){
        	var list = this.get('vRlist'),
        		sum = 0;
        	
        	for(var i = list.length-1; i >= 0; i--){
        		if(list[i].score != -999999){
					list[i].score = list[i].score.toFixed(2);
        		} else {
        			list[i].score = '--';
        		}
        		
        		if(list[i].rank == -999999){
        			list[i].rank = '--';
        		}
        		
        		
    			list[i].weight = Number(list[i].weight).toFixed(2)+'%';
        	}
        	this.set('vRlist',list);
    	}
    });
    return TotalInfo;
});