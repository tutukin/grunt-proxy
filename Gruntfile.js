/*
 * grunt-proxy
 * 
 *
 * Copyright (c) 2012 Andrei V. Toutoukine
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js','tasks/*.js'],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Configuration to be run (and then tested).
		proxy: {
			simple : {
				options : {
					target : {
						host: 'localhost',
						port: 8011
					},
					port : 8050
				}
			},
			table : {
				options : {
					router : {
						'localhost/host1' : 'localhost:8011',
						'localhost/host2' : 'localhost:8012'
					},
					port	: 8051
				}
			}
		},
		
		// Test servers
		connect: {
			host1:	{
				options : {
					port : 8011,
					base : "test/hosts/1"
				}
			},
			host2:	{
				options : {
					port : 8012,
					base : "test/hosts/2"
				}
			}
		},

		// Unit tests.
		simplemocha : {
			options		: {
				reporter : 'spec'
			},
			all : { src : 'test/**/*.js' }
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-simple-mocha');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['connect', 'proxy', 'simplemocha']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
