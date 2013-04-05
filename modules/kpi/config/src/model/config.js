define(function(require, exports, module) {
    "use strict";

    var Config = Backbone.Model.extend({
        idAttribute: "ins_id",
        urlRoot: "dspPri",
        defaults: {
            "ins_id": "",
            "pageList": ""
        }
    });
    return Config;
});