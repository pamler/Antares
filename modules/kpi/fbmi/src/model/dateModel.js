define(function(require, exports, module) {
    "use strict";

    var DateInfo = Backbone.Model.extend({
        defaults: {
            objName:'',
            objValue:'',
            year:''
        },
        
		initialize: function(){
			this.formatData();
		},        
        
        formatData: function(){
        	var v;
        	
        	v = this.get('objName');
    		this.set('objName',v.substr(4,2));
    		this.set('year',v.substr(0,4));
    		
    		v = this.get('objValue');
    		if (v == 0||v==''||v==-999999){
        		this.set('objValue','--');
        	}
    	}
    });
    return DateInfo;
});