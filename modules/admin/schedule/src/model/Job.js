define(function(require, exports, module) {
    "use strict";

    var Job = Backbone.Model.extend({
        idAttribute:"jobID",
        urlRoot:'job',
        defaults: {
            jobID: "",
            systemID: "",
            systemName: "",
            svcDtlID: 0,
            funDtlID: 0,
            jobEnNM: "",
            jobCnNM: ""
        }
    });
    return Job;
});