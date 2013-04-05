define(function(require, exports, module) {
    "use strict";

    var Param = Backbone.Model.extend({
        defaults: {
            "send_ins_id":"",
            "rev_ins_id":"",
            "pageList": "",
            "businessType":""
        }
    });
    return Param;
});