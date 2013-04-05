define(function(require, exports, module) {
	"use strict";
    var totalInfo = require('../model/totalInfo');

    var TotalInfos = Backbone.Collection.extend({
        model: totalInfo
    });

    return TotalInfos;

});