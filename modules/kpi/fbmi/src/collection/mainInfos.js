define(function(require, exports, module) {
	"use strict";
    var mainInfo = require('../model/mainInfoModel');

    var MainInfos = Backbone.Collection.extend({
        model: mainInfo
    });

    return MainInfos;

});