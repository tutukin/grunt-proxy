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
			gruntfile	: {
				src	: 'Gruntfile.js'
			},
			
			tasks		: {
				src	: ['tasks/**/*.js']
			},
			
			tests		: {
				src	: ['test/*.js'],
				options : {jshintrc:'test/.jshintrc'}
			},
			
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
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
			all : { src : '<%= jshint.tests.src %>' },
			unit: { src : 'test/unit_test.js'}
		},
		
		watch : {
			gruntfile	: {
				files		: '<%= jshint.gruntfile.src %>',
				tasks		: ['jshint:gruntfile']
			},
			
			tasks		: {
				files		: '<%= jshint.tasks.src %>',
				tasks		: ['jshint:tasks','simplemocha:unit']
			},
			
			tests		: {
				files		: '<%= jshint.tests.src %>',
				tasks		: ['jshint:tests','simplemocha:unit']
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'connect', 'proxy', 'simplemocha:all']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['test']);

};
