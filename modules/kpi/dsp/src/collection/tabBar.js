define(function(require, exports, module) {
	"use strict";
    var Tab = require('../model/tab');

    var TabBar = Backbone.Collection.extend({
        model: Tab,
        url: function() {
            return 'resources/json/tabbar.json';
        },

        parse: function(response) {
            return response.responseData;
        }
    });

    return TabBar;

});