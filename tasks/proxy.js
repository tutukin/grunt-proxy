/*
 * grunt-proxy
 * 
 *
 * Copyright (c) 2012 Andrei V. Toutoukine
 * Licensed under the MIT license.
 */

'use strict';
var httpProxy = require('http-proxy');

module.exports = function(grunt) {
	
	grunt.registerMultiTask('proxy', 'Start proxy server', function() {
		var options = this.options(),  // TODO: defaults?
			createargs = [],
			listenargs = [],
			proxy;
		
		if ( options.target ) { // TODO: use options config to configure createServer call
			createargs.push({
				target : options.target
			});
		}
		else if (options.router) { // TODO: use options config to configure createServer call
			createargs.push({
				router : options.router
			});
		}
		
		if ( typeof options.port === 'undefined' ) {
			// todo: throw new Error()
		}
		
		listenargs.push(options.port);
		
		if ( options.host ) {
			listenargs.push( options.host );
		}
		
		proxy = httpProxy.createServer.apply(httpProxy,createargs);
		proxy.listen.apply(proxy,listenargs);
		
	});
	
};
