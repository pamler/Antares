define(function(require, exports, module) {
    "use strict";

    var Subscription = Backbone.Model.extend({
        url:'info',
    	defaults: {
    		bmiEmailBinding:'',
    		bmiMobileBinding:'',
    		orderIns:''
        }
    });
    return Subscription;
});