// ## Core
// Implements the mediator pattern and
// encapsulates the core functionality for this application.
// Based on the work by Addy Osmani and Nicholas Zakas.
//
// * [Patterns For Large-Scale JavaScript Application Architecture](http://addyosmani.com/largescalejavascript/)
// * [Large-scale JavaScript Application Architecture Slides](http://speakerdeck.com/u/addyosmani/p/large-scale-javascript-application-architecture)
// * [Building Large-Scale jQuery Applications](http://addyosmani.com/blog/large-scale-jquery/)
// * [Nicholas Zakas: Scalable JavaScript Application Architecture](http://www.youtube.com/watch?v=vXjVFPosQHw&feature=youtube_gdata_player)
// * [Writing Modular JavaScript: New Premium Tutorial](http://net.tutsplus.com/tutorials/javascript-ajax/writing-modular-javascript-new-premium-tutorial/)
// include 'deferred' if using zepto
define(function(require, exports, module) {
    "use strict";
    
    var sandbox = require('aura_sandbox'),
    	permissions = require('aura_perm'),
    	EventEmitter = require('eventemitter');

    var core = {}; // Mediator object
    var pubsub;
    var emitQueue = [];
    var isWidgetLoading = false;
    var WIDGETS_PATH = 'modules'; // Path to widgets
    var sandboxOfModule = []; // For unique widget sandbox module names

    // http://stackoverflow.com/q/11536177
    EventEmitter.prototype.emitArgs = function(event, args) {
        this.emit.apply(this, [event].concat(args));
    };

    pubsub = new EventEmitter({
    	wildcard: true,
    	delimeter: '.'
    }); // Pubsub


    // Returns true if an object is an array, false if it is not.
    //
    // * (isArray)[https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray]
    if (!Array.isArray) {
        Array.isArray = function(vArg) {
        	return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

    // Is a given variable an object? (via zepto)
    function isObject(obj) {
    	return obj instanceof Object;
    }

    // Get the widgets path
    core.getWidgetsPath = function() {
    	return WIDGETS_PATH;
    };

    // Handle logging request from channel
    core.log = function(channel) {
	    var args = Array.prototype.slice.call(arguments, 0);
	    args[0] = '[' + channel + ']';
	    console.log.apply(console, args);
    };

    // Subscribe to an event
    //
    // A facade to sandboxes' pubsub
    //
    // * **param:** {string} event Event name
    // * **param:** {function} callback Module callback
    // * **param:** {object} context Context in which to execute the callback
    core.on = function(event, callback, context) {
	    if (event === undefined || callback === undefined || context === undefined) {
	        throw new Error('Event, callback, and context must be defined');
	    }
	
	    if (typeof event !== 'string' & !Array.isArray(event)) {
	        throw new Error('Event must be an EventEmitter compatible argument (string or array)');
	    }
	
	    event = core.normalizeEvent(event);
	    if (typeof callback !== 'function') {
	        throw new Error('Callback must be a function');
	    }
	
	    pubsub.on(event, callback.bind(context));
    };
    
    core.once = function(event, callback, context) {
	    if (event === undefined || callback === undefined || context === undefined) {
	        throw new Error('Event, callback, and context must be defined');
	    }
	
	    if (typeof event !== 'string' & !Array.isArray(event)) {
	        throw new Error('Event must be an EventEmitter compatible argument (string or array)');
	    }
	
	    event = core.normalizeEvent(event);
	    if (typeof callback !== 'function') {
	        throw new Error('Callback must be a function');
	    }
	
	    pubsub.once(event, callback.bind(context));
    };

    core.removeAllListeners = function() {
    	return pubsub.removeAllListeners.apply(pubsub, arguments);
    };

    core.removeSandboxListeners = function(sandbox) {
	    if (arguments.length !== 1) {
	        throw new Error('sandbox name must be defined');
	    }
	
	    var event = sandbox + '.**';
	    pubsub.removeAllListeners.call(pubsub, event);
    };

    core.listeners = function(event) {
	    if (typeof event === 'undefined') {
	        throw new Error('Event must be defined');
	    }
	    if ((typeof event !== 'string') && (!Array.isArray(event))) {
	        throw new Error('Event must be an EventEmitter compatible argument (string or array)');
	    }
	
	    event = core.normalizeEvent(event);
	    return pubsub.listeners.call(pubsub, event);
    };

    // Turn the event to an EventEmitter array if string
    //
    // 'namespace.ext.that' => ['namespace', 'ext', 'that']
    //
    //  * **param:** {string / array} EventEmitter compatible event
    //  return keyed array
    core.normalizeEvent = function(event) {
    	return typeof event === 'string' ? event.split('.') : event.slice();
    };

    core.getEmitQueueLength = function() {
    	return emitQueue.length;
    };

    // Publish event to all sandbox pubsubs. Supports queued events.
    //
    // * **param:** {string} event Event
    core.emit = function() {
	    var args;
	
	    if (isWidgetLoading) { // Catch emit event!
	        emitQueue.push(arguments);
	        return false;
	    } else {
	        var event = arguments[0];
	        if (typeof event === 'undefined') {
	            throw new Error('Event must be defined');
	        }
	
	        if ((typeof event !== 'string') && (!Array.isArray(event))) {
	            throw new Error('Event must be an EventEmitter compatible argument (string or array)');
	        }
	
	      event = core.normalizeEvent(event);
	
	      args = arguments[1];
	      args = (typeof args === 'string') ? [args] : args;
	
	      try {
	          pubsub.emitArgs(event, args);
	      } catch (e) {
	          console.error(e.message);
	      }
	    }
	
	    return true;
    };

    // Empty the list with all stored emit events.
    core.emptyEmitQueue = function() {
	    var args, i, len;
	    isWidgetLoading = false;
	
	    for (i = 0, len = emitQueue.length; i < len; i++) {
	        core.emit.apply(this, emitQueue[i]);
	    }
	
	    // _.each(emitQueue, function(args) {
	    //  core.emit.apply(this, args);
	    // });
	
	    emitQueue = [];
    };

    // Automatically load a widget and initialize it. File name of the
    // widget will be derived from the sandbox name, decamelized and
    // underscore delimited by default.
    //
    // * **param:** {Object/Array} an array with objects or single object containing channel and options
    core.start = function(list) {
//	    var args = [].slice.call(arguments, 1);
	    if (typeof(list) !== 'object') {
	        throw new Error('Sandbox properties must be defined as an object');
	    }
	
	    var promises = [];
	
	    function load(module, options) {
	        var dfd = $.Deferred();
	        var file = module.replace(/\./g, '/');
	        var widgetsPath = core.getWidgetsPath();
	        var widgetPath = widgetsPath + '/' + file;
	        if($.inArray(module, sandboxOfModule) == -1){
		        // Instantiate unique sandbox
		        var widgetSandbox = sandbox.create(core, module, permissions);
		
		        // Apply application extensions
		        if (core.getSandbox) {
		        	widgetSandbox = core.getSandbox(widgetSandbox, module);
		        }
		
		        // Unique sandbox module to be used by this widget
		        var widgetSandboxId = 'sandbox.' + module;
		        define(widgetSandboxId, [], widgetSandbox);
		        sandboxOfModule.push(module);
	        }
	
	        require.async([widgetPath + '/src/controller'], function(controller) {
		        if(controller){
		        	controller(options);
		        	dfd.resolve();
		        } else {
		        	console.warn('Could not load module: ' + file);
		        	dfd.resolve();
		        }
	        });    
	        return dfd.promise();
	    }
	
	    isWidgetLoading = true;
	    for (var module in list) {
	        var widget = list[module];
	
	        promises.push(load(module, widget.options || {}));
	    }
	
	    $.when.apply($, promises).done(core.emptyEmitQueue);
    };

    // Unload a widget (collection of modules) by passing in a named reference
    // to the channel/widget. This will both locate and reset the internal
    // state of the modules in require.js and empty the widgets DOM element
    //
    // * **param:** {string} sandbox Sandbox name
    // * **param:** {string} el Element name (Optional)
    core.stop = function(file, el) {
	    // Remove all listeners for sandbox
	    core.removeSandboxListeners(sandbox);
	
	    // Remove all modules under a widget path (e.g widgets/todos)
	    core.unload('widgets/' + file);
	
	    // Remove widget descendents, unbinding any event handlers
	    // attached to children within the widget.
	    if (el) {
	        $(el).children().remove();
	    }
    };

    // Undefine/unload a module, resetting the internal state of it in require.js
    // to act like it wasn't loaded. By default require won't cleanup any markup
    // associated with this
    //
    // The interesting challenge with .stop() is that in order to correctly clean-up
    // one would need to maintain a custom track of dependencies loaded for each
    // possible channel, including that channels DOM elements per dependency.
    //
    // This issue with this is shared dependencies. E.g, say one loaded up a module
    // containing jQuery, others also use jQuery and then the module was unloaded.
    // This would cause jQuery to also be unloaded if the entire tree was being done
    // so.
    //
    // A simpler solution is to just remove those modules that fall under the
    // widget path as we know those dependencies (e.g models, views etc) should only
    // belong to one part of the codebase and shouldn't be depended on by others.
    //
    // * **param:** {string} channel Event name
    core.unload = function(channel) {
	    var key;
	    var contextMap = require.s.contexts._.defined;
	
	    for (key in contextMap) {
	        if (contextMap.hasOwnProperty(key) && key.indexOf(channel) !== -1) {
	            require.undef(key);
	        }
	    }
    };

    return core;

});
