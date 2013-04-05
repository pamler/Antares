// ## Sandbox
// Implements the sandbox pattern and set up an standard interface for modules.
// This is a subset of the mediator functionality.
define(function(require, exports, module) {
  'use strict';

  return {
    create: function(mediator, module, permissions) {
      var sandbox = {};

      sandbox.log = function() {
        var args = Array.prototype.concat.apply([module], arguments);

        mediator.log.apply(mediator, args);
      };

      sandbox.log.event = function() {
        sandbox.log('[event2log] Event from: ' + module);
        if (arguments.length) {
          sandbox.log('Additional data:', arguments);
        }
      };

      // * **param:** {string} event
      // * **param:** {object} callback Module
      // * **param:** {object} context Callback context
      sandbox.on = function(event, callback, context) {
        var sandboxEvent;
        if (event === undefined || callback === undefined) {
          throw new Error('Event and callback must be defined');
        }

        if ((typeof event !== 'string') && (!Array.isArray(event))) {
          throw new Error('Event must be an EventEmitter compatible argument (string or array)');
        }

        if (typeof callback !== 'function') {
          throw new Error('Callback must be a function');
        }
        var sandboxEvent = mediator.normalizeEvent(event);
        sandboxEvent.unshift(module);
//        var allowed_sandboxes = permissions.sandboxes(module);
//        for (var listeningSandbox in allowed_sandboxes) {
//          sandboxEvent.unshift(listeningSandbox); // the subscribing module/sandbox
        mediator.on.call(mediator, sandboxEvent, callback, context || this);
//        }

      };
      
      // * **param:** {string} event
      // * **param:** {object} callback Module
      // * **param:** {object} context Callback context
      sandbox.once = function(event, callback, context) {
        var sandboxEvent;
        if (event === undefined || callback === undefined) {
          throw new Error('Event and callback must be defined');
        }

        if ((typeof event !== 'string') && (!Array.isArray(event))) {
          throw new Error('Event must be an EventEmitter compatible argument (string or array)');
        }

        if (typeof callback !== 'function') {
          throw new Error('Callback must be a function');
        }
        var sandboxEvent = mediator.normalizeEvent(event);
        sandboxEvent.unshift(module);
       
        mediator.once.call(mediator, sandboxEvent, callback, context || this);
      };

      // sandbox.logEvent can subscribe to events and print them
      //
      // * **param:** {string} event
      // * **param:** {object} context Callback context
      sandbox.on.log = function(event, context) {
        event = mediator.normalizeEvent(event);
        event.unshift(module);
        mediator.on(event, sandbox.log.event, context || this);
      };

      sandbox.listeners = function() {
        // @todo, if is array, iterate through events prepending module ns
        var event;
        event = mediator.normalizeEvent(arguments[0]);
        event.unshift('*');

        return mediator.listeners(event);
      };

      // * **param:** {string} event Event pattern
      sandbox.emit = function(event) {
	    if (event === undefined) {
          throw new Error('Event must be defined');
        }

        if ((typeof event !== 'string') && (!Array.isArray(event))) {
          throw new Error('Event must be an EventEmitter compatible argument (string or array)');
        }

        var args = [].slice.call(arguments, 1);

        var sandboxEvent = mediator.normalizeEvent(event);
        sandboxEvent.unshift(module);
//        var allowed_sandboxes = permissions.sandboxes(module);
//        for (var listeningSandbox in allowed_sandboxes) {
//          sandboxEvent.unshift(listeningSandbox); // the subscribing module/sandbox
        mediator.emit.call(mediator, sandboxEvent, args);
//        }
      };

      // * **param:** {Object/Array} an array with objects or single object containing channel and element
      sandbox.start = function(list) {
    	  debugger;
    	  mediator.start.apply(mediator, arguments);
      };

      // * **param:** {string} module Sandbox name
      // * **param:** {string} el Element name
      sandbox.stop = function(module, el) {
        mediator.stop.apply(mediator, arguments);
      };

      return sandbox;

    }
  };
});
