/*
 * grunt-proxy
 * 
 *
 * Copyright (c) 2012 Andrei V. Toutoukine
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var httpProxy = require('http-proxy');
	
	grunt.registerMultiTask('proxy', 'Start proxy server', function() {
		var options = this.options(); // TODO: defaults?
		
		if ( options.target )
			httpProxy.createServer( options.target.port, options.target.host ).listen( options.port );
		else if (options.router)
			httpProxy.createServer( { router:options.router} ).listen( options.port );
	});
	
};
