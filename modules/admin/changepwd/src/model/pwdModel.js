define(function(require, exports, module) {
    "use strict";

    var PasswordModel = Backbone.Model.extend({
        url:'admin/pwd',
    	defaults: {
    		oldPwd:'',
    		newPwd:'',
    		confirmPwd:''
        }
    });
    return PasswordModel;
});