define(function(require, exports, module) {
    "use strict";

    var ContactInfo = Backbone.Model.extend({
        url:'users/extendinfo',
    	defaults: {
        	email1:'',
        	email2:'',
        	email3:'',
        	mobile1:'',
        	mobile2:'',
        	mobile3:''
        }
    });
    return ContactInfo;
});