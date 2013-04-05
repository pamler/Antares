define(function(require, exports, module) {
    "use strict";

    var Info = Backbone.Model.extend({
        defaults: {
            nowDate: "",
            amount: "",
            insId: "",
            proportion: "",
            rank: ""
        },
        
        formatData: function(){
        	var ftNowDate, ftAmount;
        	if(this.get('nowDate')){
	        	ftNowDate = this.get('nowDate').substr(0,4)+'年'+ 
	        		this.get('nowDate').substr(4,2)+'月';
    		} else {
    			ftNowDate = "";
    		}
    		
    		if(this.get('amount')){
	        	ftAmount = (Number(this.get('amount'))/10000).toFixed(2);
    		} else {
    			ftAmount = "";
    		}
    		
    		this.set({
        		nowDate:ftNowDate,
        		amount:ftAmount
    		});
    		
    		return this;
    	}
    });
    return Info;
});