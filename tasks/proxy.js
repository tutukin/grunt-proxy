/*
 * grunt-proxy
 *
 *
 * Copyright (c) 2012 Andrei V. Toutoukine
 * Licensed under the MIT license.
 */

'use strict';
var httpProxy = require('http-proxy');

var DEFAULT_PORT = 9000;

module.exports = function(grunt) {

	grunt.registerMultiTask('proxy', 'Start proxy server', function() {
		var options = this.options(),
			listenPort = DEFAULT_PORT,
			listenArgs = [],
			proxy;

		if (options.router) {
			// setting router supercedes target
			delete options.target;
		}

		if ( typeof options.port !== 'undefined' ) {
			// make sure it's really a number
			if( !isNaN(options.port) ){
				listenPort = parseInt(options.port, 10);
			}
			delete options.port;
		}
		listenArgs.push(listenPort);


		if ( options.host ) {
			listenArgs.push( options.host );
			delete options.host;
		}

		proxy = httpProxy.createServer.call(httpProxy,options);
		proxy.listen.apply(proxy,listenArgs);

	});

};
