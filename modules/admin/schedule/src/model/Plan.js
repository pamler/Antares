define(function(require, exports, module) {
    "use strict";

    var Plan = Backbone.Model.extend({
    	idAttribute:"scheduleId",
    	urlRoot:'schedule',
        defaults: {
            scheduleId: "",
            taskId: "",
            jobId: "",
            systemId: "",
            startDate: "",
            endDate: "",
            retry: "",
            timeout: "",
            condition: "",
            job: "",
            task: ""
        }
    });
    return Plan;
});