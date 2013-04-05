define(function(require, exports, module) {
	"use strict";
    var dateInfo = require('../model/dateModel');

    var DateInfos = Backbone.Collection.extend({
        model: dateInfo
    });

    return DateInfos;

});