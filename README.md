# grunt-proxy

Start proxy server using [http-proxy][].

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][],
install this plugin with the following command:

```bash
npm install grunt-proxy --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-proxy');
```

If the plugin has been installed correctly, running `grunt --help`
at the command line should list the newly-installed plugin's task
or tasks. In addition, the plugin should be listed in package.json
as a `devDependency`, which ensures that it will be installed whenever
the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
[http-proxy]: https://npmjs.org/package/http-proxy

## The "proxy" task

### Overview
In your project's Gruntfile, add a section named `proxy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  proxy: {
    proxy1 : {
    	options : {
    		port : 8050,			// start proxy server, listening to the port 8050
		host : 'localhost',			// bind proxy server to 'localhost' interface
		target : {				// make it forward all the requests to localhost:8011
				host: 'localhost',
				port: 8011
		}
	}
    },
    proxy2 : {
    	options : {
    		port	: 8051,	// start proxy server, listening to the port 8050
		router : {		// make it forward requests according to this table
			'localhost/host1' : 'localhost:8011',
			'localhost/host2' : 'localhost:8012'
		}
	}
    }
  },
})
```

### Options

#### options.port
Type: `Integer`
Default value: none

A port number to which the proxy server should listen

#### options.host
Type: `String`
Default value: none

An optional hostname that to listen to.

#### options.target
Type: `Object`
Default value: none

An object with properties `host` and `port`. If this option is given then all the requests to
the proxy server will be proxied to the specified target.

#### options.router
Type: `Object`
Default value: none

Proxy table, which is a simple lookup table that maps incoming requests
to proxy target locations. If options.target is also given the proxy table
is totally ignored (this behaviour will be changed in the future). 
 
### Usage Examples

see tests

### Tests

note, if you see

```
Warning: Arguments to path.resolve must be strings Use --force to continue.
```

running grunt simplemocha:unit, please apply [patch](https://github.com/SBoudrias/grunt-simple-mocha/commit/8b93f23efa51d8f0a11aa063e64b464c24dbd243)
to grunt-simple-mocha

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
April 2, 2013 v. 0.0.2

	- add `host` option, that is passed to proxy.listen() method
	- some refactorings
	- unit tests

January 5, 2013 v. 0.0.1

	- main functionality
